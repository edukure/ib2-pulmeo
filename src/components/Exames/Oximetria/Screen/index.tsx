import { VStack, Heading } from '@chakra-ui/react';

import useBluetooth from '@hooks/useBluetooth';
import { useState } from 'react';
import Instrucoes from '../Instrucoes';

type OximetriaScreenProps = {
  id: string;
  nome: string;
};

// Service = df40b603-33dd-4d59-bb53-aef20c08ee67

// Characteristic f89bcd15-58d3-4465-a240-e6420b3ede5e

// Descriptor fc3cca29-fc97-420c-9bd0-39485cdcdbbc

type Etapa = 'instrucoes' | 'coleta' | 'fim';

function OximetriaScreen({ id, nome }: OximetriaScreenProps) {
  const { start, stop, values, getDeviceInfo, connectionStatus, disconnect } =
    useBluetooth(
      'Pulmeo - Oximetro',
      'df40b603-33dd-4d59-bb53-aef20c08ee67',
      'f89bcd15-58d3-4465-a240-e6420b3ede5e'
    );

  const [etapa, setEtapa] = useState<Etapa>('instrucoes');

  const handleConectarBluetooth = async () => {
    await getDeviceInfo();
  };

  return (
    <VStack
      bg="white"
      rounded="lg"
      border="3px solid"
      borderColor="teal.500"
      h="100%"
      spacing={4}
    >
      <Heading bg="teal.500" w="full" color="white" textAlign="center" py={2}>
        Oximetria
      </Heading>

      {etapa === 'instrucoes' && (
        <Instrucoes
          connectionStatus={connectionStatus}
          handleConectarBluetooth={handleConectarBluetooth}
          handleFim={() => {
            setEtapa('coleta');
          }}
        />
      )}

      {etapa === 'coleta' && (
        <Instrucoes
          connectionStatus={connectionStatus}
          handleConectarBluetooth={handleConectarBluetooth}
          handleFim={() => {
            setEtapa('coleta');
          }}
        />
      )}
    </VStack>
  );
}

export default OximetriaScreen;
