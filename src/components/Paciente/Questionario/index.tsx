import React, { ChangeEvent, FormEvent, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Checkbox,
  Text,
  CheckboxGroup,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';

import { BASE_URL } from '@config';

type Paciente = {
  nome: string;
  teveCovid: boolean;
  fumante: boolean;
  doencaRespiratoria: string;
  idade: number;
  peso: number;
  altura: number;
};

function Questionario() {
  const { data: session, status } = useSession();

  const [pacienteInfo, setPacienteInfo] = useState<Paciente>({
    nome: session.user.name,
    teveCovid: false,
    fumante: true,
    doencaRespiratoria: '',
    idade: 18,
    peso: 0,
    altura: 0,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.getAttribute('name');

    const isCheckbox = event.target.type === 'checkbox';

    setPacienteInfo({
      ...pacienteInfo,
      [fieldName]: isCheckbox ? event.target.checked : event.target.value,
    });
  };

  const pacienteDTO = {
    role: 'paciente',
    nome: pacienteInfo.nome,
    teveCovid: pacienteInfo.teveCovid,
    fumante: pacienteInfo.fumante,
    doencaRespiratoria: pacienteInfo.doencaRespiratoria,
    idade: pacienteInfo.idade,
    peso: pacienteInfo.peso,
    altura: pacienteInfo.altura,
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(`${BASE_URL}/api/update-userinfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pacienteDTO),
    });

    if (response.status === 200) {
      Router.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input
            colorScheme="teal"
            type="text"
            name="nome"
            onChange={handleChange}
            value={pacienteInfo.nome}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Idade</FormLabel>

          <InputGroup>
            <Input
              type="number"
              name="idade"
              onChange={handleChange}
              value={pacienteInfo.idade}
            />
            <InputRightAddon>anos</InputRightAddon>
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Peso</FormLabel>
          <InputGroup>
            <Input
              type="text"
              name="peso"
              onChange={handleChange}
              value={pacienteInfo.peso}
            />
            <InputRightAddon>kg</InputRightAddon>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Altura</FormLabel>

          <InputGroup>
            <Input
              type="text"
              name="altura"
              onChange={handleChange}
              value={pacienteInfo.altura}
            />
            <InputRightAddon>m</InputRightAddon>
          </InputGroup>
        </FormControl>

        <Text color="gray.600">Informações adicionais</Text>
        <CheckboxGroup colorScheme="teal" defaultValue={[]}>
          <Checkbox value="teveCovid" name="teveCovid" onChange={handleChange}>
            já tive covid
          </Checkbox>
          <Checkbox value="fumante" name="fumante" onChange={handleChange}>
            sou fumante
          </Checkbox>
        </CheckboxGroup>
        <FormControl>
          <FormLabel>Tem outra doença respiratória? Se sim, qual?</FormLabel>
          <Input
            type="text"
            name="doencaRespiratoria"
            onChange={handleChange}
            value={pacienteInfo.doencaRespiratoria}
          />
        </FormControl>
        <Button colorScheme="teal" type="submit">
          Confirmar
        </Button>
      </Stack>
    </form>
  );
}

export default Questionario;
