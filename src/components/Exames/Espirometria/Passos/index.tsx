import React from 'react';
import NextImage from 'next/image';
import { Step, Steps } from 'chakra-ui-steps';
import {
  VStack,
  Text,
  OrderedList,
  ListItem,
  Image,
  Icon,
} from '@chakra-ui/react';
import { MdBluetoothSearching } from 'react-icons/md';

type StepsProps = {
  ativo: number;
};

export const listaPassos = [
  {
    key: 'primeiro',
    componente: (
      <VStack px={4} pt={8} textAlign={'center'} flex="1 1 auto" spacing={8}>
        <NextImage
          src="/sitting-on-a-chair.png"
          alt="sente-se em um lugar calmo"
          height={'160px'}
          width="160px"
          layout="fixed"
        />
        <Text>
          Encontre um lugar calmo e sente-se em um local confortável para
          realizar o exame
        </Text>
      </VStack>
    ),
  },
  {
    key: 'segundo',
    componente: (
      <VStack px={4} pt={8} textAlign={'center'} flex="1 1 auto" spacing={8}>
        <NextImage
          src="/on-off.png"
          alt="sente-se em um lugar calmo"
          height={'160px'}
          width="160px"
          layout="fixed"
        />
        <Text>
          Ligue o equipamento na chave que se encontra na lateral da caixa
        </Text>
      </VStack>
    ),
  },
  {
    key: 'terceiro',
    componente: (
      <VStack px={4} pt={8} textAlign={'center'} flex="1 1 auto" spacing={8}>
        <Icon as={MdBluetoothSearching} h={40} w={40} />
        <Text>Ative o bluetooth do seu celular e conecte o espirômetro</Text>
      </VStack>
    ),
  },
  {
    key: 'quarto',
    componente: (
      <VStack px={4} pt={4} flex="1 1 auto" textAlign={'center'} spacing={4}>
        <NextImage
          src="/breath.png"
          alt="sente-se em um lugar calmo"
          height={'160px'}
          width="160px"
          layout="fixed"
        />
        <Text>
          Respire normalmente e tente relaxar por aproximadamente XX minutos
        </Text>
      </VStack>
    ),
  },
  // {
  //   key: 'quinto',
  //   componente: (
  //     <VStack px={4} pt={8} textAlign={'center'} flex="1 1 auto" spacing={8}>
  //       <NextImage
  //         src="/breath-in.png"
  //         alt="sente-se em um lugar calmo"
  //         height={'160px'}
  //         width="160px"
  //         layout="fixed"
  //       />
  //       <Text>
  //         Inspire profudamente antes de
  //       </Text>
  //     </VStack>
  //   ),
  // },
];

function Passos({ ativo }: StepsProps) {
  return (
    <Steps
      activeStep={ativo}
      orientation="horizontal"
      responsive={false}
      colorScheme="teal"
      pl={3}
    >
      {listaPassos.map(({ componente, key }, index) => (
        <Step
          // label={activeStep === index ? label : ''}
          key={key}
        />
      ))}
    </Steps>
  );
}

export default Passos;
