import { Button, Flex, Stack } from '@chakra-ui/react';

import Header from '@components/Medico/Header';
import PacientesTable, { Paciente } from '@components/Paciente/Table';
import MedicoBase from '@utils/models/Medico';

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

interface Medico extends Omit<MedicoBase, 'pacientes'> {
  pacientes: Paciente[];
}

type MedicoScreenProps = {
  medico: Medico;
};

function MedicoScreen({ medico }: MedicoScreenProps) {
  const handleAssociar = async () => {
    await fetch('http://localhost:3000/api/medico/associar-paciente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idPaciente: '61660fb59e62adaf559e8051' }),
    });
  };
  return (
    <Stack w="full" spacing={8}>
      {/*  cabeçalho com info do médico */}
      <Header medico={medico} />

      <Flex mb={8} justifyContent="center" w="full">
        <Button colorScheme="teal" onClick={handleAssociar}>
          Buscar Paciente
        </Button>
      </Flex>

      {/*  listagem dos pacientes */}
      <PacientesTable pacientes={medico.pacientes} />
    </Stack>
  );
}

export default MedicoScreen;
