import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';

function Questionario() {
  const { data: session, status } = useSession();

  const [medicoInfo, setMedicoInfo] = useState({
    nome: session.user.name,
    crm: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.getAttribute('name');

    setMedicoInfo({
      ...medicoInfo,
      [fieldName]: event.target.value,
    });
  };

  const medicoDTO = {
    role: 'medico',
    nome: medicoInfo.nome,
    crm: medicoInfo.crm,
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('submitting');

    const response = await fetch('http://localhost:3000/api/update-userinfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medicoDTO),
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
