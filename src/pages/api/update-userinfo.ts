import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  console.log(session);
  console.log(req.body);
  res.status(200).json({ name: 'John Doe' });
};
