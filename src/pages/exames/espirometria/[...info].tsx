import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import { BASE_URL } from '@config';
import { getUserFromSession, pegarPacientePorId } from '@utils/db';

import PageWrapper from '@components/PageWrapper';
import EspirometriaScreen from '@components/Paciente/EspirometriaScreen';

function EspirometriaPage({ data, paciente, exemplo }) {
  console.log(data);
  return (
    <PageWrapper>
      <EspirometriaScreen data={data} paciente={paciente} />
    </PageWrapper>
  );
}

export default EspirometriaPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [idPaciente, idExame] = context.params.info as string[];

  const session = await getSession(context);

  const usuario = await getUserFromSession(session);
  const { responsaveis, ...paciente } = await pegarPacientePorId(usuario.id);
  // pegar exame individual
  const data = [];

  return {
    props: { data, paciente },
  };
};
