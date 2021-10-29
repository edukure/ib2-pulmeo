import React from 'react';
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
        <Image
          src="/sitting-on-a-chair.png"
          alt="sente-se em um lugar calmo"
          maxH={40}
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
        <Image src="/on-off.png" alt="sente-se em um lugar calmo" maxH={40} />
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
        <Text>Ative o bluetooth do seu celular e conecte o oxímetro</Text>
      </VStack>
    ),
  },
  {
    key: 'quarto',
    componente: (
      <VStack px={4} pt={4} textAlign={'left'} flex="1 1 auto" spacing={4}>
        <Image src="/oximetro.png" alt="sente-se em um lugar calmo" maxH={40} />
        <OrderedList spacing={4} fontSize="1rem" px={2}>
          <ListItem>Coloque o dedo indicador no sensor de oximetria.</ListItem>
          <ListItem>
            Verifique se a luz está bem no centro do seu dedo.
          </ListItem>
          <ListItem>
            Feche o velcro de forma que não fique nem muito apertado, e nem
            solto
          </ListItem>
        </OrderedList>
      </VStack>
    ),
  },
  {
    key: 'quinto',
    componente: (
      <VStack px={4} pt={8} textAlign={'center'} flex="1 1 auto" spacing={8}>
        <Image
          src="/alarm-clock.png"
          alt="sente-se em um lugar calmo"
          maxH={40}
        />
        <Text>
          Espere 5 segundos para que a medição seja feita. Depois, retire o
          sensor e desligue o aparelho.
        </Text>
      </VStack>
    ),
  },
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
