import React from 'react';
import { Step, Steps } from 'chakra-ui-steps';
import { VStack, Text, OrderedList, ListItem } from '@chakra-ui/react';

type StepsProps = {
  ativo: number;
};

export const listaPassos = [
  {
    key: 'primeiro',
    componente: (
      <VStack px={4} textAlign={'center'} flex="1 1 auto">
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
      <VStack px={4} textAlign={'center'} flex="1 1 auto">
        <Text>
          Ligue o equipamento na chave que se encontra na lateral da caixa
        </Text>
      </VStack>
    ),
  },
  {
    key: 'terceiro',
    componente: (
      <VStack px={4} textAlign={'center'} flex="1 1 auto">
        <Text>Ative o bluetooth do seu celular e conecte o oxímetro</Text>
      </VStack>
    ),
  },
  {
    key: 'quarto',
    componente: (
      <VStack px={4} textAlign={'left'} flex="1 1 auto">
        <OrderedList spacing={4}>
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
      <VStack px={4} textAlign={'center'} flex="1 1 auto">
        <Text>
          Espere X segundos para que a medição seja feita. Depois, retire o
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
