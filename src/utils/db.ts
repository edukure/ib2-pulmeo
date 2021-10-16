import { connectToDatabase } from '@config/mongodb';
import { ObjectId } from 'bson';
import { userInfo } from 'os';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import Medico from './models/Medico';
import Paciente from './models/Paciente';
import Usuario from './models/Usuario';

export const getUserFromSession = async (session) => {
  const { db } = await connectToDatabase();

  const { _id, role, ...rest } = await db
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

  if (role === 'paciente') {
    return {
      id: _id.toString(),
      role,
      ...rest,
    } as Paciente;
  }

  return {
    id: _id.toString(),
    role,
    ...rest,
  } as Medico;
};

export const pegarPacientePorId = async (id) => {
  const { db } = await connectToDatabase();
  const { _id, ...user } = await db.collection('users').findOne({
    _id: new ObjectId(id),
  });

  return { ...user, id: _id.toString() } as Paciente;
};

export const associarPaciente = async (
  idMedico: string,
  paciente: Paciente
) => {
  const { db } = await connectToDatabase();

  // coloca o paciente na lista de pacientes
  const response = await db.collection('users').updateOne(
    {
      _id: new ObjectId(idMedico),
    },
    {
      $addToSet: { pacientes: new ObjectId(paciente.id) },
    }
  );

  // coloca o medico como responsavel do paciente
  await db.collection('users').updateOne(
    {
      _id: new ObjectId(paciente.id),
    },
    {
      $addToSet: { responsaveis: new ObjectId(idMedico) },
    }
  );

  return response;
};

// isso aqui provavelmente está errado
export const podeAcessarPaciente = async (session): Promise<boolean> => {
  // verifcar se o medico tem o paciente na sua lista
  const { db } = await connectToDatabase();

  // é o paciente

  let usuario = (await db
    .collection('users')
    .aggregate([
      {
        $match: {
          email: session.user.email,
        },
      },
      {
        $project: {
          role: 1,
          pacientes: 1,
          responsaveis: 1,
        },
      },
    ])
    .next()) as Usuario;

  console.log('quem ta acessando', usuario);

  return true;
};

export const pegarPacientes = async (idMedico) => {
  const { db } = await connectToDatabase();

  const response = (await db
    .collection('users')
    .aggregate([
      {
        $project: {
          nome: 1,
          id: 1,
          image: 1,
          role: 1,
          responsaveis: 1,
        },
      },
    ])
    .toArray()) as Partial<
    Pick<Paciente, '_id' | 'nome' | 'image' | 'role' | 'responsaveis'>
  >[];

  console.log('reposn', response);

  if (response.length > 0) {
    const pacientesDoMedico = response.filter(
      ({ role, responsaveis = [] }) =>
        role === 'paciente' &&
        responsaveis
          .map((responsavel) => responsavel.toString())
          .includes(idMedico)
    );

    // remover role e converter id para string
    const pacientes = pacientesDoMedico.map(
      ({ _id, role, responsaveis, ...rest }) => ({
        id: _id.toString(),
        ...rest,
      })
    );

    return pacientes; // {id, image, nome}
  }
};
