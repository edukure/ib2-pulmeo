import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { getUserFromSession, pegarPacientesDoMedico } from '@utils/db';

import PageWrapper from '@components/PageWrapper';
import MedicoScreen from '@components/Medico/Screen';

const Home = ({ medico }) => {
  return (
    <PageWrapper>
      <MedicoScreen medico={medico} />
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // check for session etc
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const user = await getUserFromSession(session);

  if (user.role === 'paciente') {
    return {
      redirect: {
        destination: `/pacientes/${user.id.toString()}`,
        permanent: true,
      },
    };
  }

  const infoPacientes = await pegarPacientesDoMedico(user.id);

  if (user.role === 'medico') {
    const { pacientes, ...tudoMenosPacientes } = user;
    return {
      props: {
        medico: {
          ...tudoMenosPacientes,
          pacientes: infoPacientes,
        },
        session,
      },
    };
  }
};

export default Home;
