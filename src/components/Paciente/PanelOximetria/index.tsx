import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Stack,
  Button,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';
import Link from '@components/Link';
import { Oximetria } from '@utils/models/Exame';

type PanelOximetriaProps = {
  exames: Oximetria[];
  role: 'paciente' | 'medico';
};

function PanelOximetria({ exames = [], role }: PanelOximetriaProps) {
  return (
    <Stack spacing={4} alignItems="center">
      {role === 'paciente' && (
        <Button
          colorScheme="teal"
          rightIcon={<AddIcon />}
          as={Link}
          href="/exames/oximetria"
        >
          Novo Exame
        </Button>
      )}
      {exames.length === 0 && <Text color="gray.500">Sem registros</Text>}
      {exames.length > 0 && (
        <Table bg="white" maxW="container.md" w="100%" rounded="lg" mb={8}>
          <Thead>
            <Tr>
              <Th>SpO2 (%)</Th>
              <Th>data</Th>
            </Tr>
          </Thead>

          <Tbody>
            {exames.map((exame) => (
              <Tr
                key={exame.id}
                fontSize="1.2rem"
                bg="white"
                _hover={{
                  transform: 'scale(1.01)',
                  bg: 'gray.100',
                }}
              >
                <Td w="50%">
                  <Text>{exame.detalhes.spo2.toFixed(1)}%</Text>
                </Td>
                <Td>{new Date(exame.data).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Stack>
  );
}

export default PanelOximetria;
