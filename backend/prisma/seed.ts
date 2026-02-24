import { PrismaClient, PropertyStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const properties = [
        {
            title: 'Luxury Apartment in HSR Layout',
            location: 'Bangalore, India',
            description: 'A premium residential property in the heart of the tech hub.',
            totalValuation: 10000000, // 1 Cr
            minInvestment: 500,
            expectedROI: 12.5,
            rentalYield: 4.5,
            totalShares: 20000,
            fundedShares: 10000,
            status: 'AVAILABLE' as PropertyStatus,
            imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
        },
        {
            title: 'Modern Office Space in Gurgaon',
            location: 'Cyber Hub, Gurgaon',
            description: 'Prime commercial real estate with high rental yield.',
            totalValuation: 50000000, // 5 Cr
            minInvestment: 10000,
            expectedROI: 15.0,
            rentalYield: 8.0,
            totalShares: 50000,
            fundedShares: 45000,
            status: 'AVAILABLE' as PropertyStatus,
            imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        },
        {
            title: 'Beachside Villa in Goa',
            location: 'Anjuna, Goa',
            description: 'Exclusive holiday home with high appreciation potential.',
            totalValuation: 25000000, // 2.5 Cr
            minInvestment: 5000,
            expectedROI: 18.0,
            rentalYield: 3.5,
            totalShares: 25000,
            fundedShares: 25000,
            status: 'FUNDED' as PropertyStatus,
            imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
        }
    ];

    for (const p of properties) {
        await prisma.property.create({
            data: p,
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
