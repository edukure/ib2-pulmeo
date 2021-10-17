import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import {
  associarPaciente,
  pegarPacientePorId,
  getUserFromSession,
} from '@utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('chegou');
  if (req.method !== 'POST') return res.status(405).end();

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).end();
  }
  console.log('tem sessao');

  /* procurar medico logado */
  const medico = await getUserFromSession(session);

  if (!medico) {
    return res.status(404).json({ message: 'medico não encontrado' });
  }
  console.log('tem medico');
  /* -------------------------------- */

  /* verificar se o paciente existe */
  const { idPaciente } = req.body;
  console.log(idPaciente);

  const paciente = await pegarPacientePorId(idPaciente);

  if (!paciente)
    return res.status(404).json({ message: 'paciente não encontrado' });
  console.log('tem paciente', paciente);
  /* -------------------------------- */

  console.log(await associarPaciente(medico.id, paciente));

  return res.status(200).end();
};
