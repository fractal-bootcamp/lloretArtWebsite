import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const artists = await prisma.user.findMany();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch artists' });
    } finally {
        await prisma.$disconnect();
    }
}
