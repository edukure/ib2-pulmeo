import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserFromSession, pegarPacientesDoMedico } from '@utils/db';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const user = await getUserFromSession(session);

  const pacientes = await pegarPacientesDoMedico(user.id);

  return res.status(200).json(pacientes);
};
