import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all properties
router.get('/', async (req, res) => {
    try {
        const properties = await prisma.property.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});

// Get single property
router.get('/:id', async (req, res) => {
    try {
        const property = await prisma.property.findUnique({
            where: { id: req.params.id }
        });
        if (!property) return res.status(404).json({ error: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch property' });
    }
});

// Add new property
router.post('/', async (req, res) => {
    try {
        const {
            title,
            location,
            description,
            totalValuation,
            minInvestment,
            expectedROI,
            rentalYield,
            imageUrl,
            totalShares
        } = req.body;

        const property = await prisma.property.create({
            data: {
                title,
                location,
                description,
                totalValuation: parseFloat(totalValuation),
                minInvestment: parseFloat(minInvestment) || 500,
                expectedROI: parseFloat(expectedROI),
                rentalYield: parseFloat(rentalYield),
                imageUrl,
                totalShares: parseFloat(totalShares) || 100,
                status: 'AVAILABLE'
            }
        });

        res.status(201).json(property);
    } catch (error) {
        console.error("error creating property:", error);
        res.status(500).json({ error: 'Failed to create property' });
    }
});

// Delete property
router.delete('/:id', async (req, res) => {
    try {
        await prisma.property.delete({
            where: { id: req.params.id }
        });
        res.json({ message: 'Property deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete property' });
    }
});

export default router;
