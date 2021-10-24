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

type PanelOximetriaProps = {
  exames: {
    id: string;
    spo2: number;
    data: Date;
  }[];
  role: 'paciente' | 'medico';
};

function PanelOximetria({ exames, role }: PanelOximetriaProps) {
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
      <Table bg="white" maxW="container.md" w="100%" rounded="lg" mb={8}>
        <Thead>
          <Tr>
            <Th>SpO2 (%)</Th>
            <Th>data</Th>
          </Tr>
        </Thead>
        <Tbody>
          {exames &&
            exames.map((exame) => (
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
                  <Text>{exame.spo2}</Text>
                </Td>
                <Td>{exame.data.toLocaleDateString()}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Stack>
  );
}

export default PanelOximetria;
