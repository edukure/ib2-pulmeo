import React from 'react';
import { GetServerSideProps } from 'next';

import PageWrapper from '../../components/PageWrapper';

function PacientesPage() {
  return (
    <PageWrapper>
      {/*  cabeçalho com info do paciente */}
      {/*  listagem dos exames */}
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // check for session etc

  return {
    props: {},
  };
};

export default PacientesPage;
