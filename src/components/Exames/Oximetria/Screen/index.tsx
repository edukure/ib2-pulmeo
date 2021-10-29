import { useEffect, useState } from 'react';
import { VStack, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Coleta from '@components/Exames/Oximetria/Coleta';
import useBluetooth from '@hooks/useBluetooth';
import Instrucoes from '../Instrucoes';

type OximetriaScreenProps = {
  id: string;
  nome: string;
};

// Service = df40b603-33dd-4d59-bb53-aef20c08ee67

// Characteristic f89bcd15-58d3-4465-a240-e6420b3ede5e

// Descriptor fc3cca29-fc97-420c-9bd0-39485cdcdbbc

type Etapa = 'instrucoes' | 'coleta' | 'fim';

const fake = [
  { id: 1, value: '226255-248235' },
  { id: 2, value: '225634-245926' },
  { id: 3, value: '225375-246445' },
  { id: 4, value: '225617-247126' },
  { id: 5, value: '225775-247493' },
  { id: 6, value: '225892-247833' },
  { id: 7, value: '226013-248087' },
  { id: 8, value: '226082-248315' },
  { id: 9, value: '226145-248494' },
  { id: 10, value: '226100-247081' },
  { id: 11, value: '225172-246272' },
  { id: 12, value: '225348-246875' },
  { id: 13, value: '225590-247465' },
  { id: 14, value: '225716-247749' },
  { id: 15, value: '225818-248048' },
  { id: 16, value: '225912-248301' },
  { id: 17, value: '225979-248485' },
  { id: 18, value: '225963-247585' },
  { id: 19, value: '224951-245869' },
  { id: 20, value: '225012-246355' },
  { id: 21, value: '225305-247077' },
];

const add = [
  { id: 22, value: '211862-234944' },
  { id: 23, value: '212105-234490' },
  { id: 24, value: '212589-236320' },
  { id: 25, value: '212525-235989' },
  { id: 26, value: '212207-235205' },
  { id: 27, value: '213063-237231' },
  { id: 28, value: '212873-236906' },
  { id: 29, value: '212797-236366' },
  { id: 30, value: '212460-235103' },
  { id: 31, value: '212546-236046' },
  { id: 32, value: '211793-233944' },
  { id: 33, value: '212544-235597' },
  { id: 34, value: '212278-234330' },
  { id: 35, value: '212587-235475' },
  { id: 36, value: '213270-237066' },
  { id: 37, value: '212932-235924' },
  { id: 38, value: '213484-237444' },
  { id: 39, value: '212844-235850' },
  { id: 40, value: '213466-236104' },
  { id: 41, value: '213442-237165' },
  { id: 42, value: '212818-235720' },
];

function OximetriaScreen({ id, nome }: OximetriaScreenProps) {
  const router = useRouter();
  const { start, stop, values, getDeviceInfo, connectionStatus, disconnect } =
    useBluetooth(
      'Pulmeo - Oximetro',
      'df40b603-33dd-4d59-bb53-aef20c08ee67',
      'f89bcd15-58d3-4465-a240-e6420b3ede5e'
    );

  const [fakeData, setFakeData] = useState(fake);

  const [etapa, setEtapa] = useState<Etapa>('instrucoes');

  const handleConectarBluetooth = async () => {
    await getDeviceInfo();
  };

  useEffect(() => {}, []);

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
          }}
        />
      )}

      {etapa === 'coleta' && (
        <Coleta
          handleConcluir={() => {
            router.push(`/pacientes/${id}`);
          }}
          handleFimDaColeta={async (spo2) => {
            // await stop();
            // await disconnect();
            console.log('valor q vai pra api', spo2);
          }}
          handleIniciar={() => {
            start();
            // setTimeout(() => {
            //   console.log('timeout!!');
            //   setFakeData((current) => [...current, ...add]);
            // }, 2000);
          }}
          values={values}
        />
      )}
    </VStack>
  );
}

export default OximetriaScreen;
