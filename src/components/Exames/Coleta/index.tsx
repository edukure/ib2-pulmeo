import React, { useEffect, useState } from 'react';
import {
  VStack,
  Spinner,
  Text,
  Button,
  Icon,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

type ColetaProps = {
  values?: {
    id: number;
    value: string | number;
  }[];
  handleFimDaColeta: () => void;
  handleConcluir: () => void;
};

function Coleta({ handleFimDaColeta, handleConcluir, values }: ColetaProps) {
  const [acabou, setAcabou] = useState(false);
  useEffect(() => {
    if (values.length > 20) {
      setAcabou(true);
      handleFimDaColeta();
    }
  }, [values]);

  return (
    <VStack w="full" h="full" spacing={8} justifyContent="center">
      {!acabou && (
        <>
          <Spinner size="xl" thickness="4px" color="teal" />
          <Text>Aguarde até o fim da coleta</Text>
        </>
      )}
      {acabou && (
        <>
          <Icon as={BsFillCheckCircleFill} w={32} h={32} color="green.400" />
          <Text fontSize="2rem">Coleta finalizada!</Text>
          <Button onClick={handleConcluir} colorScheme="teal" w="80%">
            Concluir
          </Button>
        </>
      )}

      <UnorderedList>
        {values && values.map((v) => <ListItem key={v.id}>{v.value}</ListItem>)}
      </UnorderedList>
    </VStack>
  );
}

export default Coleta;
