import React from 'react';
import { Table, Thead, Tr, Th, Tbody, Td, Text, Stack } from '@chakra-ui/react';
import Header from '@components/Paciente/Header';

// data = {
//   dados: [
//     fluxo,
//     volume,
//     fluxoPorVolume
//   ],
//   fluxoMaximo,
//   capacidadeVital,
//   vef1
// }

function EspirometriaScreen({ data, paciente }) {
  return (
    <Stack w="full" spacing={8}>
      <Header {...paciente} />

      {/* Tabela com informações fluxo maximo, volume total, fev1*/}
      <Table bg="white" maxW="container.md" w="100%" rounded="lg" mb={8}>
        <Thead>
          <Tr>
            <Th>Fluxo Máximo</Th>
            <Th>Capacidade Vital</Th>
            <Th>VEF1</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Td>
            <Text>{0} L/min</Text>
          </Td>
          <Td>
            <Text>{0} L</Text>
          </Td>
          <Td>
            <Text>{0} L</Text>
          </Td>
        </Tbody>
      </Table>

      {/* Grafico Fluxo x Tempo */}
      {/* Grafico Volume x Tempo */}
      {/* Grafico Fluxo x Volume */}
    </Stack>
  );
}

export default EspirometriaScreen;
