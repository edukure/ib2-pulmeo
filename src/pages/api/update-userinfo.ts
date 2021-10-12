import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@config/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const session = await getSession({ req });
  const userInfo = req.body;

  if (!session) {
    return res.status(401).end();
  }

  const { db } = await connectToDatabase();
  const { userId } = await db.collection('sessions').findOne({
    email: userInfo.email,
  });

  if (!userId) {
    return res.status(404).json({ message: 'user not found' });
  }

  await db.collection('users').updateOne(
    { _id: userId },
    {
      $set: {
        ...userInfo,
      },
    }
  );

  return res.status(200).end();
};
