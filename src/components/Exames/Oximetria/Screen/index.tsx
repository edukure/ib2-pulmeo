import { VStack, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Coleta from '@components/Exames/Coleta';

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
  const router = useRouter();
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
      h="full"
      w="full"
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

            start();
          }}
        />
      )}

      {etapa === 'coleta' && (
        <Coleta
          handleConcluir={() => {
            router.push(`/pacientes/${id}`);
          }}
          handleFimDaColeta={async () => {
            await stop();
            await disconnect();
          }}
          values={values}
        />
      )}
    </VStack>
  );
}

export default OximetriaScreen;
