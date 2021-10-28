import { GetStaticProps } from 'next';

import fs from 'fs';
import path from 'path';

import { BASE_URL } from '@config';

import PageWrapper from '@components/PageWrapper';
import EspirometriaScreen from '@components/Paciente/EspirometriaScreen';

function EspirometriaExemploPage({ data, paciente, exemplo }) {
  console.log(data);
  return (
    <PageWrapper>
      <EspirometriaScreen data={data} paciente={paciente} />
    </PageWrapper>
  );
}

export default EspirometriaExemploPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await fetch(`${BASE_URL}/api/espirometria/${params.id}`);
  const data = await response.json();
  const pacienteFalso = {
    nome: 'Eduardo',
    altura: '1.58',
    peso: 58,
    image:
      'https://lh3.googleusercontent.com/a/AATXAJzV9H9xJbGyX4dEcdAqjxbeL1kLjv5Gzy3G1HY6=s96-c',
    email: 'tioma.eduardo@gmail.com',
    teveCovid: false,
    fumante: false,
    idade: 23,
  };
  return {
    props: { data, paciente: pacienteFalso },
  };
};

export const getStaticPaths = async () => {
  const dir = path.resolve('./public', 'espirometria');
  const files = fs.readdirSync(dir, 'utf8');

  const paths = files
    .map((file) => file.replace('.txt', ''))
    .map((fileId) => ({
      params: { id: fileId },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
};
