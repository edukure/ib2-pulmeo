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
  Flex,
  Box,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
const MotionBox = motion(Box);

type ColetaProps = {
  values?: {
    id: number;
    value: string | number;
  }[];
  handleFimDaColeta: () => void;
  handleConcluir: () => void;
};

const TimerInspirar = ({ onComplete }) => {
  const theme = useTheme();
  return (
    <MotionBox
      transition={{ ease: 'easeOut', duration: 3 }}
      initial={{ scale: 1.0 }}
      animate={{ scale: 1.3 }}
    >
      <CountdownCircleTimer
        isPlaying
        duration={3}
        colors={[[theme.colors.orange['300'], 1]]}
        onComplete={onComplete}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </MotionBox>
  );
};

const TimerExpirar = ({ onComplete }) => {
  const theme = useTheme();
  return (
    <MotionBox
      transition={{ ease: 'easeOut', duration: 6 }}
      initial={{ scale: 1.3 }}
      animate={{ scale: 0.9 }}
    >
      <CountdownCircleTimer
        isPlaying
        duration={6}
        colors={[[theme.colors.teal['300'], 1]]}
        onComplete={onComplete}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </MotionBox>
  );
};

const TimerRelaxar = ({ onComplete }) => {
  const theme = useTheme();
  return (
    <CountdownCircleTimer
      isPlaying
      duration={5}
      colors={[
        [theme.colors.gray['600'], 0.8],
        [theme.colors.red['600'], 0.2],
      ]}
      onComplete={onComplete}
    >
      {({ remainingTime }) =>
        remainingTime < 3 ? (
          <Text fontSize="1.25rem">prepare-se</Text>
        ) : (
          remainingTime
        )
      }
    </CountdownCircleTimer>
  );
};

function Coleta({ handleFimDaColeta, handleConcluir, values }: ColetaProps) {
  const [contagem, setContagem] = useState(0);
  const acabou = contagem === 3;
  if (acabou) handleFimDaColeta();

  const [estado, setEstado] = useState<
    'inspirando' | 'expirando' | 'relaxando'
  >('relaxando');

  const handleFimTimerInspirar = () => {
    setEstado('expirando');
  };

  const handleFimTimerExpirar = () => {
    setEstado('relaxando');
    setContagem((atual) => atual + 1);
  };

  const handleFimTimerRelaxar = () => {
    setEstado('inspirando');
  };

  return (
    <VStack
      w="full"
      h="full"
      spacing={8}
      justifyContent="center"
      fontSize="2rem"
    >
      {!acabou && estado === 'inspirando' && (
        <>
          <Text>Inspire</Text>
          <TimerInspirar onComplete={handleFimTimerInspirar} />
        </>
      )}
      {!acabou && estado === 'expirando' && (
        <>
          <Text>Expire</Text>
          <TimerExpirar onComplete={handleFimTimerExpirar} />
        </>
      )}
      {!acabou && estado === 'relaxando' && (
        <>
          <Text>Relaxe</Text>
          <TimerRelaxar onComplete={handleFimTimerRelaxar} />
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
