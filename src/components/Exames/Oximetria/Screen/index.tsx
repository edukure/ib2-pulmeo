import {
  Button,
  VStack,
  Heading,
  HStack,
  Tag,
  Spinner,
} from '@chakra-ui/react';
import { useSteps } from 'chakra-ui-steps';
import { FaBluetoothB } from 'react-icons/fa';

import useBluetooth from '@hooks/useBluetooth';
import Passos, { listaPassos } from '../Passos';

type OximetriaScreenProps = {
  id: string;
  nome: string;
};

// Service = df40b603-33dd-4d59-bb53-aef20c08ee67

// Characteristic f89bcd15-58d3-4465-a240-e6420b3ede5e

// Descriptor fc3cca29-fc97-420c-9bd0-39485cdcdbbc

function OximetriaScreen({ id, nome }: OximetriaScreenProps) {
  const {
    start,
    stop,
    values,
    getDeviceInfo,
    bluetoothDevice,
    connectionStatus,
    disconnect,
  } = useBluetooth(
    'Pulmeo - Oximetro',
    'df40b603-33dd-4d59-bb53-aef20c08ee67',
    'f89bcd15-58d3-4465-a240-e6420b3ede5e'
  );

  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

  const handleAvancar = () => {
    if (activeStep < listaPassos.length - 1) {
      nextStep();
    }
  };

  const handleVoltar = () => {
    if (activeStep > 0) {
      prevStep();
    }
  };

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

      <Passos ativo={activeStep} />

      <VStack w="full" h="full" pb={4} px={2} fontSize="1.5rem">
        {listaPassos[activeStep].componente}

        {connectionStatus === 'connecting' && (
          <>
            <Spinner size="lg" thickness="4px" color="blue.500" />
            {/* <Button colorScheme="red" isFullWidth onClick={disconnect}>
              Cancelar
            </Button> */}
          </>
        )}

        {connectionStatus === 'disconnected' && activeStep === 2 && (
          <Button
            isFullWidth
            colorScheme="messenger"
            onClick={handleConectarBluetooth}
            rightIcon={<FaBluetoothB />}
          >
            Conectar
          </Button>
        )}

        {connectionStatus === 'connected' && activeStep === 2 && (
          <Tag px={4} py={2} colorScheme="messenger">
            Oxímetro conectado!
          </Tag>
        )}

        <HStack justifyContent="flex-end" w="full">
          <Button
            onClick={handleVoltar}
            w="full"
            colorScheme="blackAlpha"
            display={activeStep === 0 ? 'none' : 'block'}
          >
            Voltar
          </Button>

          <Button
            onClick={handleAvancar}
            w="full"
            colorScheme="teal"
            // disabled={connectionStatus !== 'connected' && activeStep === 2}
          >
            Avançar
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
}

export default OximetriaScreen;
