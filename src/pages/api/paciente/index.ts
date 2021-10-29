import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@config/mongodb';
import Paciente from '@utils/models/Paciente';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).end();

  const session = await getSession({ req });
  const exame = JSON.parse(req.body);

  if (!session) {
    return res.status(401).end();
  }

  const { db } = await connectToDatabase();
  const user = (await db.collection('users').findOne({
    email: session.user.email,
  })) as Paciente;

  const { _id } = user;

  if (!_id) {
    return res.status(404).json({ message: 'user not found' });
  }

  await db.collection('users').updateOne(
    { _id: _id },
    {
      $addToSet: {
        exames: {
          id: user.exames?.length ?? 1,
          ...exame,
        },
      },
      $set: {
        exameMaisRecente: {
          data: exame.data,
          tipo: 'oximetria',
        },
      },
    }
  );

  return res.status(200).end();
};
