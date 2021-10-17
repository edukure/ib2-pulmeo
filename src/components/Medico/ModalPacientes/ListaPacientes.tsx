import React, { useState, useEffect } from 'react';
import {
  VStack,
  Flex,
  HStack,
  Avatar,
  Text,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { BASE_URL } from '@config';

type ListaPacientesProps = {};
type Paciente = {
  nome: string;
  image: string;
  id: string;
};

function ListaPacientes({}: ListaPacientesProps) {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const toast = useToast();

  const handleAssociar = async (id) => {
    const response = await fetch(`${BASE_URL}/api/medico/pacientes/associar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idPaciente: id }),
    });

    if (response.ok) {
      await pegarPacientes();
      return toast({
        title: 'Paciente associado com sucesso',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }

    toast({
      title: 'Não foi possível completar associar o paciente',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  };

  const pegarPacientes = async () => {
    const resposta = await fetch(
      `${BASE_URL}/api/medico/pacientes/listar-disponiveis`
    );
    const pacientes = await resposta.json();
    setPacientes(pacientes);
  };

  useEffect(() => {
    pegarPacientes();
  }, []);

  return (
    <VStack w="full" spacing={4}>
      {pacientes.length > 0 &&
        pacientes.map((paciente) => (
          <Paciente
            {...paciente}
            key={paciente.id}
            onAdd={() => handleAssociar(paciente.id)}
          />
        ))}

      {pacientes.length === 0 && <Text>Nenhum paciente disponível</Text>}
    </VStack>
  );
}

function Paciente({ nome, image, id, onAdd }) {
  return (
    <Flex justifyContent="space-between" w="full">
      <HStack spacing={4}>
        <Avatar src={image} />
        <Text>{nome}</Text>
      </HStack>
      <IconButton
        aria-label="adicionar paciente"
        icon={<AddIcon />}
        colorScheme="green"
        onClick={onAdd}
      />
    </Flex>
  );
}

export default ListaPacientes;
