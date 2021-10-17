import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';

import Medico from '@utils/models/Medico';
import { BASE_URL } from '@config';

type DTO = Pick<Medico, 'nome' | 'crm' | 'role'>;

function Questionario() {
  const { data: session, status } = useSession();

  const [medicoInfo, setMedicoInfo] = useState<DTO>({
    nome: session.user.name,
    crm: '',
    role: 'medico',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.getAttribute('name');

    setMedicoInfo({
      ...medicoInfo,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('submitting');

    const response = await fetch(`${BASE_URL}/api/update-userinfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicoInfo),
    });

    if (response.status === 200) {
      if (response.status === 200) {
        Router.push('/');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Nome</FormLabel>
          <Input
            type="text"
            name="nome"
            onChange={handleChange}
            value={medicoInfo.nome}
          />
        </FormControl>
        <FormControl>
          <FormLabel>CRM</FormLabel>
          <Input
            type="text"
            name="crm"
            onChange={handleChange}
            alue={medicoInfo.crm}
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
