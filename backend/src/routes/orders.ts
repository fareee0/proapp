import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Place a sell order
router.post('/sell', async (req, res) => {
    const { userId, propertyId, shares, pricePerShare } = req.body;

    try {
        // Check if user has enough shares
        const investment = await prisma.investment.findUnique({
            where: { userId_propertyId: { userId, propertyId } }
        });

        if (!investment || investment.sharesOwned < shares) {
            return res.status(400).json({ error: 'Insufficient shares' });
        }

        const order = await prisma.order.create({
            data: {
                sellerId: userId,
                propertyId,
                totalShares: shares,
                pricePerShare,
                type: 'SELL',
                status: 'OPEN'
            }
        });

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to place order' });
    }
});

// Get open orders for a property
router.get('/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    try {
        const orders = await prisma.order.findMany({
            where: { propertyId, status: 'OPEN' },
            include: { seller: { select: { name: true } } }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

export default router;
