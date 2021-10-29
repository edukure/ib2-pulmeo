import React from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Stack,
  Box,
} from '@chakra-ui/react';
import Header from '@components/Paciente/Header';
import GraficoFluxo from '../Graficos/Fluxo';
import GraficoVolume from '../Graficos/Volume';

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
  const { dados, fluxoMaximo, vef1, capacidadeVital } = data;
  return (
    <Stack w="full" spacing={8} pb={16}>
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
            <Text>{(fluxoMaximo.value * 60).toFixed(2)} L/min</Text>
          </Td>
          <Td>
            <Text>{capacidadeVital.toFixed(2)} L</Text>
          </Td>
          <Td>
            <Text>{vef1.toFixed(2)} L</Text>
          </Td>
        </Tbody>
      </Table>

      {/* Grafico Fluxo x Tempo */}
      <Box
        bg="white"
        rounded="lg"
        py={4}
        display="flex"
        justifyContent="center"
      >
        <GraficoFluxo fluxo={dados.fluxo} maximo={fluxoMaximo} />
      </Box>

      {/* Grafico Volume x Tempo */}
      <Box
        bg="white"
        rounded="lg"
        py={4}
        display="flex"
        justifyContent="center"
      >
        <GraficoVolume volume={dados.volume} />
      </Box>
      {/* Grafico Fluxo x Volume */}
    </Stack>
  );
}

export default EspirometriaScreen;
