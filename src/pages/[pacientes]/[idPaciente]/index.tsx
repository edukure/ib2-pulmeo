import React from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import PageWrapper from '@components/PageWrapper';
import PacienteScreen from '@components/Paciente/Screen';

import {
  getUserFromSession,
  pegarPacientePorId,
  podeAcessarPaciente,
} from '@utils/db';

function PacientesPage({ paciente, role }) {
  return (
    <PageWrapper>
      <PacienteScreen paciente={paciente} role={role} />
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

  const usuario = await getUserFromSession(session);

  if (!podeAcessarPaciente(usuario, query.idPaciente as string)) {
    return {
      redirect: {
        destination: '/acesso-negado',
        permanent: true,
      },
    };
  }

  const { responsaveis, ...paciente } = await pegarPacientePorId(
    query.idPaciente
  );

  const { role } = usuario;

  return {
    props: {
      session,
      role,
      paciente: {
        ...paciente,
        // exames: [
        //   {
        //     id: 322,
        //     tipo: 'oximetria',
        //     data: new Date().toLocaleDateString(),
        //   },
        //   {
        //     id: 323,
        //     tipo: 'oximetria',
        //     data: new Date(-1).toLocaleDateString(),
        //   },
        //   {
        //     id: 321,
        //     tipo: 'espirometria',
        //     data: new Date(-2).toLocaleDateString(),
        //   },
        // ],
      },
    },
  };
};

export default PacientesPage;
