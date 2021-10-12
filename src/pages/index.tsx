import { GetServerSideProps } from 'next';

import PageWrapper from '@components/PageWrapper';
import HeaderMedico from '@components/Medico/Header';
import PacientesTable from '@components/Paciente/Table';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@config/mongodb';
import { getUserFromSession } from '@utils/db';

const dummyItems = [
  {
    id: 1,
    name: 'Eduardo',
    image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    lastRecord: new Date().toLocaleString(),
    recordType: 'oximetria',
  },
  {
    id: 2,
    name: 'Joao',
    image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    lastRecord: new Date().toLocaleString(),
    recordType: 'oximetria',
  },
  {
    id: 3,
    name: 'Carol',
    image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    lastRecord: new Date().toLocaleString(),
    recordType: 'espirometria',
  },
  {
    id: 4,
    name: 'Luiza',
    image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    lastRecord: new Date().toLocaleString(),
    recordType: 'oximetria',
  },
];

const Home = ({ medico }) => {
  return (
    <PageWrapper>
      {/*  cabeçalho com info do médico */}
      <HeaderMedico medico={medico} />

      {/*  listagem dos pacientes */}
      {/* <PacientesList pacientes={dummyItems} /> */}
      <PacientesTable pacientes={dummyItems} />
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
        permanent: true,
      },
    };
  }

  const user = await getUserFromSession(session);

  if (user.role === 'medico') {
    return {
      props: {
        medico: user,
      },
    };
  }

  if (user.role === 'paciente') {
    return {
      redirect: {
        destination: `/pacientes/${user.id}`,
        permanent: true,
      },
    };
  }
};

export default Home;
