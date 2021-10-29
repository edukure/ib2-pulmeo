import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
  HStack,
  Text,
} from '@chakra-ui/react';

import Link from '@components/Link';

export type Paciente = {
  id: string;
  image?: string;
  nome?: string;
  exameMaisRecente?: {
    data: string;
    tipo: 'expirometria' | 'oximetria';
  };
};

type PacientesTableProps = {
  pacientes: Paciente[];
};

function PacientesTable({ pacientes }: PacientesTableProps) {
  return (
    <Table bg="white" maxW="container.md" w="full" rounded="lg" mb={8}>
      <Thead>
        <Tr>
          <Th>paciente</Th>
          <Th>último regristro</Th>
          <Th>tipo</Th>
        </Tr>
      </Thead>
      <Tbody>
        {pacientes.map((paciente) => (
          <Link
            as={Tr}
            href={`/pacientes/${paciente.id}`}
            key={paciente.nome}
            fontSize="1.2rem"
            bg="white"
            _hover={{
              cursor: 'pointer',
              transform: 'scale(1.03)',
              rounded: 'full',
              bg: 'gray.100',
            }}
          >
            <Td>
              <HStack spacing={4}>
                <Avatar src={paciente.image} />
                <Text>{paciente.nome}</Text>
              </HStack>
            </Td>

            {paciente.exameMaisRecente ? (
              <>
                <Td>
                  {new Date(paciente.exameMaisRecente.data).toLocaleString()}
                </Td>
                <Td>{paciente.exameMaisRecente.tipo}</Td>
              </>
            ) : (
              <>
                <Td>sem registro</Td>
                <Td></Td>
              </>
            )}
          </Link>
        ))}
      </Tbody>
    </Table>
  );
}

export default PacientesTable;
