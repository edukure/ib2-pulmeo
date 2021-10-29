import React from 'react';
import { Button, VStack, HStack, Tag, Spinner } from '@chakra-ui/react';
import { useSteps } from 'chakra-ui-steps';
import { FaBluetoothB } from 'react-icons/fa';

import Passos, { listaPassos } from '../Passos';

type InstrucoesProps = {
  connectionStatus: 'connecting' | 'disconnected' | 'connected';
  handleConectarBluetooth: () => {};
  handleFim: () => void;
};

function Instrucoes({
  connectionStatus,
  handleConectarBluetooth,
  handleFim,
}: InstrucoesProps) {
  const { nextStep, prevStep, activeStep } = useSteps({
    initialStep: 0,
  });

  const handleAvancar = () => {
    if (activeStep < listaPassos.length - 1) {
      nextStep();
    }

    if (activeStep === listaPassos.length - 1) {
      handleFim();
    }
  };

  const handleVoltar = () => {
    if (activeStep > 0) {
      prevStep();
    }
  };

  return (
    <>
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
            {activeStep === listaPassos.length - 1 ? 'Iniciar' : 'Avançar'}
          </Button>
        </HStack>
      </VStack>
    </>
  );
}

export default Instrucoes;
