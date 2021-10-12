import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { Box, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react';

import PageWrapper from '@components/PageWrapper';
import QuestionarioMedico from '@components/Medico/Questionario';
import QuestionarioPaciente from '@components/Paciente/Questionario';
function NewUserPage() {
  const [role, setRole] = useState('medico');

  const handleRoleChange = (value: string) => {
    setRole(value);
  };

  return (
    <PageWrapper justifyContent="center">
      <Box maxW="container.md" bg="white" rounded="lg" py={6} px={8}>
        <Stack>
          <Heading as="h2" mb={3} textAlign="center">
            Cadastro
          </Heading>

          <Stack placeItems="center">
            <RadioGroup
              value={role}
              defaultValue="medico"
              onChange={handleRoleChange}
            >
              <Stack spacing={5} direction="row">
                <Radio colorScheme="teal" value="medico">
                  Médico
                </Radio>
                <Radio colorScheme="teal" value="paciente">
                  Paciente
                </Radio>
              </Stack>
            </RadioGroup>
          </Stack>

          {role === 'medico' && <QuestionarioMedico />}
          {role === 'paciente' && <QuestionarioPaciente />}
        </Stack>
      </Box>
    </PageWrapper>
  );
}

export default NewUserPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  return {
    props: { session },
  };
};
