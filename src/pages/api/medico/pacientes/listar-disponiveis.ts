import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserFromSession,
  listarPacientes,
  pegarPacientesDoMedico,
} from '@utils/db';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const user = await getUserFromSession(session);

  const todosPacientes = await listarPacientes();
  const pacientesDoMedico = (await pegarPacientesDoMedico(user.id)).map(
    (paciente) => paciente.id
  );

  const pacientes = todosPacientes.filter(
    (paciente) => !pacientesDoMedico.includes(paciente.id)
  );

  if (pacientes.length > 0) {
    return res.status(200).json(pacientes);
  }

  return res.status(200).json([]);
};
