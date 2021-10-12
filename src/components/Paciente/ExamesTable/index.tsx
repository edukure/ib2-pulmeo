import { Table, Thead, Tr, Th, Tbody, Td, Text } from '@chakra-ui/react';

import Link from '@components/Link';

function ExamesTable({ exames, idPaciente }) {
  return (
    <Table bg="white" maxW="container.md" w="100%" rounded="lg" mb={8}>
      <Thead>
        <Tr>
          <Th>tipo</Th>
          <Th>data</Th>
        </Tr>
      </Thead>
      <Tbody>
        {exames.map((exame) => (
          <Link
            as={Tr}
            href={`/pacientes/${idPaciente}/${exame.id}`}
            key={exame.id}
            fontSize="1.2rem"
            bg="white"
            _hover={{
              cursor: 'pointer',
              transform: 'scale(1.01)',
              bg: 'gray.100',
            }}
          >
            <Td>
              <Text>{exame.tipo}</Text>
            </Td>
            <Td>{exame.data}</Td>
          </Link>
        ))}
      </Tbody>
    </Table>
  );
}

export default ExamesTable;
