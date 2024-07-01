import { NextApiRequest, NextApiResponse } from 'next';

import { User, getUser } from '@clerk/clerk-sdk-node';


type Art = {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
    userId: number;
};


const handler = async (req: NextApiRequest & { auth: any }, res: NextApiResponse) => {
    try {
        const { userId } = req.auth;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await getUser(userId);

        res.status(200).json({ message: 'Protected content', user });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default withAuth(handler);
