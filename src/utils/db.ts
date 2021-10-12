import { connectToDatabase } from '@config/mongodb';

export const getUserFromSession = async (session) => {
  const { db } = await connectToDatabase();

  const { _id, ...rest } = await db
    .collection('users')
    .aggregate([
      {
        $match: {
          email: session.user.email,
        },
      },
      {
        $project: {
          emailVerified: 0,
        },
      },
    ])
    .next();

  const user: Partial<{ id: string; role: 'paciente' | 'medico' }> = {
    id: _id.toString(),
    ...rest,
  };
  return user;
};

export const isResposibleFor = async (session, patientId) => {
  // verifcar se o medico tem o paciente na sua lista
  const { db } = await connectToDatabase();

  const { _id, ...user } = await db
    .collection('users')
    .aggregate([
      {
        $match: {
          email: session.user.email,
        },
      },
      {
        $project: {
          pacientes: 1,
        },
      },
    ])
    .next();

  // verificar se o paciente esta na lista

  return { id: _id.toString(), ...user };
};
