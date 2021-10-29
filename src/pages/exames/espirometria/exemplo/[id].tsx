import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';

import { BASE_URL } from '@config';

import PageWrapper from '@components/PageWrapper';
import EspirometriaScreen from '@components/Paciente/EspirometriaScreen';
import {
  converterFluxoParaVolume,
  getVef1,
  getPontoMaximo,
} from '@utils/espirometria';
import { Espirometria } from '@utils/models/Exame';

function EspirometriaExemploPage({ data, paciente }) {
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

  const volume = converterFluxoParaVolume(data);
  const espirometria: Espirometria = {
    dados: {
      fluxo: data,
      volume,
    },
    vef1: getVef1(data),
    fluxoMaximo: getPontoMaximo(data),
    capacidadeVital: volume[volume.length - 1].value,
  };
  return {
    props: {
      data: espirometria,
      paciente: pacienteFalso,
    },
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
