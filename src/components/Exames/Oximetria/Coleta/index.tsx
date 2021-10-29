import React, { useEffect, useState } from 'react';
import {
  VStack,
  Spinner,
  Text,
  Button,
  Icon,
  UnorderedList,
  ListItem,
  useTheme,
} from '@chakra-ui/react';
import { BsFillCheckCircleFill, BsSpotify } from 'react-icons/bs';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { getIR_Red, getSpo2 } from '@utils/oximetria';

type ColetaProps = {
  values?: {
    id: number;
    value: string;
  }[];
  handleFimDaColeta: (spo2: number) => void;
  handleConcluir: () => void;
  handleIniciar?: () => void;
};

const Timer = ({ onComplete, spo2Ref }) => {
  const theme = useTheme();
  return (
    <CountdownCircleTimer
      isPlaying
      duration={5}
      colors={[[theme.colors.blue['600'], 1]]}
      onComplete={onComplete}
    >
      {({ remainingTime }) => (
        <Text fontSize="2rem">
          {spo2Ref.current.length > 0
            ? `${spo2Ref.current[spo2Ref.current.length - 1].toFixed(1)}%`
            : ''}
        </Text>
      )}
    </CountdownCircleTimer>
  );
};

function Coleta({
  handleFimDaColeta,
  handleConcluir,
  handleIniciar,
  values,
}: ColetaProps) {
  const [acabou, setAcabou] = useState(false);

  const spo2 = React.useRef<number[]>([]);

  useEffect(() => {
    handleIniciar();
  }, []);

  useEffect(() => {
    //processar values
    if (values.length > 20) {
      const interval = values.slice(-21, -1);
      const result = getSpo2(getIR_Red(interval));
      spo2.current = [...spo2.current, result];
      console.log('current', spo2.current);
    }
  }, [values]);

  const handleTimerComplete = () => {
    setAcabou(true);
    const spo2Medio =
      spo2.current.reduce((acc, atual) => {
        return acc + atual;
      }, 0) / spo2.current.length;
    console.log(spo2);
    handleFimDaColeta(spo2Medio);
  };

  return (
    <VStack w="full" h="full" spacing={8} justifyContent="center">
      {!acabou && (
        <>
          <Text>Aguarde</Text>
          <Timer spo2Ref={spo2} onComplete={handleTimerComplete} />
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

      {/* <UnorderedList>
        {values && values.map((v) => <ListItem key={v.id}>{v.value}</ListItem>)}
      </UnorderedList> */}
    </VStack>
  );
}

export default Coleta;
