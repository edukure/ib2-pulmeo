import React from 'react';
import { GetServerSideProps } from 'next';
import { VStack } from '@chakra-ui/react';

import PageWrapper from '@components/PageWrapper';
import HeaderPaciente from '@components/Paciente/Header';
import ExamesTable from '@components/Paciente/ExamesTable';
import NovoExame from '@components/Paciente/NovoExame';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@config/mongodb';
import {
  getUserFromSession,
  pegarPacientePorId,
  podeAcessarPaciente,
} from '@utils/db';

function PacientesPage({ paciente, role }) {
  return (
    <PageWrapper>
      {/*  cabeçalho com info do paciente */}
      <HeaderPaciente {...paciente} />

      {/*  Realizar novo exame oximetria ou espirometria */}
      {/*  renderizar condicionalmente se é paciente ou nao */}
      {role === 'paciente' && <NovoExame />}

      {/*  listagem dos exames */}
      <ExamesTable exames={paciente.exames} idPaciente={paciente.id} />
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // check for session etc
  const { query } = context;

  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    };
  }

  const { role, responsaveis, ...paciente } = await pegarPacientePorId(
    query.idPaciente
  );

  // TODO HERE
  if (!podeAcessarPaciente(session)) {
    return {
      redirect: {
        destination: '/acesso-negado',
        permanent: true,
      },
    };
  }

  return {
    props: {
      role,
      paciente: {
        ...paciente,
        exames: [
          {
            id: 322,
            tipo: 'oximetria',
            data: new Date().toLocaleDateString(),
          },
          {
            id: 323,
            tipo: 'oximetria',
            data: new Date(-1).toLocaleDateString(),
          },
          {
            id: 321,
            tipo: 'espirometria',
            data: new Date(-2).toLocaleDateString(),
          },
        ],
      },
    },
  };
};

export default PacientesPage;
