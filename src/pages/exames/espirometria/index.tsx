import EspirometriaScreen from '@components/Exames/Espirometria/Screen';
import PageWrapper from '@components/PageWrapper';
import { getUserFromSession } from '@utils/db';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

function OximetriaPage({ dadosPaciente }) {
  return (
    <PageWrapper>
      <EspirometriaScreen {...dadosPaciente} />
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const { id, nome } = await getUserFromSession(session);

  return {
    props: {
      session,
      dadosPaciente: {
        id,
        nome,
      },
    },
  };
};

export default OximetriaPage;
