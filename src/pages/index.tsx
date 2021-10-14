import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { getUserFromSession, pegarPacientes } from '@utils/db';

import { Button, Flex, Stack } from '@chakra-ui/react';

import PageWrapper from '@components/PageWrapper';
import HeaderMedico from '@components/Medico/Header';
import PacientesTable from '@components/Paciente/Table';

const dummyItems = [
  {
    id: 1,
    nome: 'Eduardo',
    image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    // lastRecord: new Date().toLocaleString(),
    // recordType: 'oximetria',
  },
  {
    id: 2,
    nome: 'Joao',
    image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    // lastRecord: new Date().toLocaleString(),
    // recordType: 'oximetria',
  },
  {
    id: 3,
    nome: 'Carol',
    image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    // lastRecord: new Date().toLocaleString(),
    // recordType: 'espirometria',
  },
  {
    id: 4,
    nome: 'Luiza',
    image: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
    // lastRecord: new Date().toLocaleString(),
    // recordType: 'oximetria',
  },
];

const Home = ({ medico }) => {
  const handleAssociar = async () => {
    console.log('cliou');
    await fetch('http://localhost:3000/api/medico/associar-paciente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idPaciente: '61660fb59e62adaf559e8051' }),
    });
  };

  return (
    <PageWrapper>
      <Stack w="full" spacing={8}>
        {/*  cabeçalho com info do médico */}
        <HeaderMedico medico={medico} />

        <Flex mb={8} justifyContent="center" w="full">
          <Button colorScheme="teal" onClick={handleAssociar}>
            Buscar Paciente
          </Button>
        </Flex>

        {/*  listagem dos pacientes */}
        {/* <PacientesList pacientes={dummyItems} /> */}
        <PacientesTable pacientes={medico.pacientes} />
      </Stack>
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

  if (user.role === 'paciente') {
    return {
      redirect: {
        destination: `/pacientes/${user.id.toString()}`,
        permanent: true,
      },
    };
  }

  const infoPacientes = await pegarPacientes(user.id);

  if (user.role === 'medico') {
    const { pacientes, ...tudoMenosPacientes } = user;
    return {
      props: {
        medico: {
          ...tudoMenosPacientes,
          pacientes: infoPacientes,
        },
      },
    };
  }
};

export default Home;
