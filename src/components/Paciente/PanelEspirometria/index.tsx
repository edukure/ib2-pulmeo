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
  Tag,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';
import Link from '@components/Link';

type PanelEspirometria = {
  exames: {
    id: string;
    fev: number;
    data: Date;
  }[];
  role: 'paciente' | 'medico';
  idPaciente: string;
};

function PanelEspirometria({ idPaciente, exames, role }: PanelEspirometria) {
  return (
    <Stack spacing={4} alignItems="center">
      {role === 'paciente' && (
        <Button
          colorScheme="teal"
          rightIcon={<AddIcon />}
          as={Link}
          href="/exames/espirometria"
        >
          Novo Exame
        </Button>
      )}
      <Table bg="white" maxW="container.md" w="100%" rounded="lg" mb={8}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>data</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* {exames &&
            exames.map((exame) => (
              <Link
                as={Tr}
                href={`/exames/espirometria/${idPaciente}/${exame.id}`}
                key={exame.id}
                fontSize="1.2rem"
                bg="white"
                _hover={{
                  transform: 'scale(1.01)',
                  bg: 'gray.100',
                }}
              >
                <Td w="50%">
                  <Text>{exame.fev}</Text>
                </Td>
                <Td>{exame.data.toLocaleDateString()}</Td>
              </Link>
            ))} */}
          {Array.from({ length: 26 }).map((_, index) => (
            <Link
              as={Tr}
              href={`/exames/espirometria/exemplo/${index + 1}`}
              key={index}
              fontSize="1.2rem"
              bg="white"
              _hover={{
                transform: 'scale(1.01)',
                bg: 'gray.100',
              }}
            >
              <Td w="50%">
                <Tag colorScheme="orange">Exemplo {index + 1}</Tag>
              </Td>
              <Td>
                {((d) => new Date(d.setDate(d.getDate() - 1)))(
                  new Date()
                ).toLocaleDateString()}
              </Td>
            </Link>
          ))}
        </Tbody>
      </Table>
    </Stack>
  );
}

export default PanelEspirometria;
