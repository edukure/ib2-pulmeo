import { useState } from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Coleta from '@components/Exames/Espirometria/Coleta';
import useBluetooth from '@hooks/useBluetooth';
import Instrucoes from '../Instrucoes';

type EspirometriaScreenProps = {
  id: string;
  nome: string;
};

// Service = df40b603-33dd-4d59-bb53-aef20c08ee67

// Characteristic f89bcd15-58d3-4465-a240-e6420b3ede5e

// Descriptor fc3cca29-fc97-420c-9bd0-39485cdcdbbc

type Etapa = 'instrucoes' | 'coleta' | 'fim';

function EspirometriaScreen({ id, nome }: EspirometriaScreenProps) {
  const router = useRouter();
  const { start, stop, values, getDeviceInfo, connectionStatus, disconnect } =
    useBluetooth(
      'Pulmeo - Espirometro',
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
        Espirometria
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
            //POST to db
          }}
          //debug purposes only
          values={values}
        />
      )}
    </VStack>
  );
}

export default EspirometriaScreen;
