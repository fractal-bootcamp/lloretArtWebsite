import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {
                name: 'Alice',
                email: 'alice@example.com',
                clerkId: 'clerk1',
                avatarUrl: 'https://example.com/alice.jpg',
            },
            {
                name: 'Bob',
                email: 'bob@example.com',
                clerkId: 'clerk2',
                avatarUrl: 'https://example.com/bob.jpg',
            },
            {
                name: 'Charlie',
                email: 'charlie@example.com',
                clerkId: 'clerk3',
                avatarUrl: 'https://example.com/charlie.jpg',
            },
        ],
    });

    const users = await prisma.user.findMany();

    const arts = [];
    for (const user of users) {
        for (let i = 1; i <= 3; i++) {
            arts.push({
                artParams: `Art ${i} by ${user.name}`,
                creatorId: user.id,
                isPublished: true,
            });
        }
    }

    await prisma.art.createMany({
        data: arts,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
