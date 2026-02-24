import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Invest in a property (Primary Market)
router.post('/invest', async (req, res) => {
    const { userId, propertyId, amount } = req.body;

    try {
        const property = await prisma.property.findUnique({
            where: { id: propertyId }
        });

        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        if (property.status === 'FUNDED' || property.fundedShares >= property.totalShares) {
            return res.status(400).json({ error: 'Property is already fully funded' });
        }

        const remainingShares = property.totalShares - property.fundedShares;
        const sharesToBuy = Math.min(amount, remainingShares);

        if (sharesToBuy <= 0) {
            return res.status(400).json({ error: 'Invalid investment amount' });
        }

        // 1. Update User Balance
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.walletBalance < sharesToBuy) {
            return res.status(400).json({ error: 'Insufficient wallet balance' });
        }

        const result = await prisma.$transaction(async (tx) => {
            // Deduct balance
            await tx.user.update({
                where: { id: userId },
                data: { walletBalance: { decrement: sharesToBuy } }
            });

            // Update Property Funding
            const updatedProperty = await tx.property.update({
                where: { id: propertyId },
                data: { fundedShares: { increment: sharesToBuy } }
            });

            // Create or Update Investment
            const investment = await tx.investment.upsert({
                where: { userId_propertyId: { userId, propertyId } },
                update: {
                    sharesOwned: { increment: sharesToBuy },
                    averagePrice: property.totalValuation / property.totalShares // Simplified
                },
                create: {
                    userId,
                    propertyId,
                    sharesOwned: sharesToBuy,
                    averagePrice: property.totalValuation / property.totalShares
                }
            });

            // Create Transaction Record
            await tx.transaction.create({
                data: {
                    userId,
                    type: 'BUY',
                    amount: sharesToBuy,
                    status: 'COMPLETED'
                }
            });

            // Check if fully funded and generate certificates
            if (updatedProperty.fundedShares >= updatedProperty.totalShares) {
                await tx.property.update({
                    where: { id: propertyId },
                    data: { status: 'FUNDED' }
                });

                // Note: Real certificate generation might be a background job
                // but for this demo, we'll mark the property as funded.
            }

            return { investment, updatedProperty };
        });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Investment failed' });
    }
});

// Get User's Portfolio
router.get('/portfolio/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const investments = await prisma.investment.findMany({
            where: { userId },
            include: { property: true }
        });
        res.json(investments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
});

export default router;
