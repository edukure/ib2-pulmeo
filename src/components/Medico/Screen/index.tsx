import { Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';

import Header from '@components/Medico/Header';
import PacientesTable from '@components/Paciente/Table';
import { BASE_URL } from '@config';
import MedicoBase from '@utils/models/Medico';
import { useState } from 'react';
import ModalPacientes from '../ModalPacientes';

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

type Paciente = {
  nome?: string;
  image?: string;
  id: string;
};

function MedicoScreen({ medico }: MedicoScreenProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pacientes, setPacientes] = useState<Paciente[]>(medico.pacientes);

  const handleClose = async () => {
    const resposta = await fetch(`${BASE_URL}/api/medico/pacientes/listar`);
    if (resposta.ok) {
      const pacientes = await resposta.json();
      setPacientes(pacientes);
    }
    onClose();
  };

  return (
    <Stack w="full" spacing={8}>
      {/*  cabeçalho com info do médico */}
      <Header medico={medico} />

      <ModalPacientes onClose={handleClose} isOpen={isOpen} />

      <Flex mb={8} justifyContent="center" w="full">
        <Button colorScheme="teal" onClick={onOpen}>
          Buscar Paciente
        </Button>
      </Flex>

      {/*  listagem dos pacientes */}
      <PacientesTable pacientes={pacientes} />
    </Stack>
  );
}

export default MedicoScreen;
