import React from 'react';
import { GetServerSideProps } from 'next';

import { Slide, Box } from '@chakra-ui/react';

import PageWrapper from '@components/PageWrapper';
import HeaderPaciente from '@components/Paciente/Header';
import ExamesTable from '@components/Paciente/ExamesTable';
import NovoExame from '@components/Paciente/NovoExame';

function PacientesPage({ paciente }) {
  return (
    <PageWrapper>
      {/*  cabeçalho com info do paciente */}
      <HeaderPaciente
        idade={paciente.idade}
        nome={paciente.nome}
        foto={paciente.foto}
      />
      {/*  Realizar novo exame oximetria ou espirometria */}
      {/*  renderizar condicionalmente se é paciente ou nao */}
      <NovoExame />

      {/*  listagem dos exames */}
      <ExamesTable exames={paciente.exames} idPaciente={paciente.id} />
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // check for session etc
  const { query } = context;

  console.log(query);

  return {
    props: {
      paciente: {
        id: 1,
        nome: 'Eduardo',
        idade: 23,
        altura: '1,58m',
        peso: '60kg',
        fumante: false,
        covid: false,
        doencaRespiratoria: '',
        email: 'tioma.eduardo@gmail.com',
        foto: 'https://randomuser.me/api/portraits/men/75.jpg',
        exames: [
          {
            id: 322,
            tipo: 'oximetria',
            data: new Date().toLocaleDateString(),
          },
          {
            id: 323,
            tipo: 'oximetria',
            data: new Date(-1).toLocaleDateString(),
          },
          {
            id: 321,
            tipo: 'espirometria',
            data: new Date(-2).toLocaleDateString(),
          },
        ],
      },
    },
  };
};

export default PacientesPage;
