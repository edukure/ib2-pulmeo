import LoginForm from '@components/LoginForm';
import PageWrapper from '@components/PageWrapper';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

function LoginPage() {
  return (
    <PageWrapper>
      <LoginForm />
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }
};

export default LoginPage;
