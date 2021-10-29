import { ObjectId } from 'bson';

interface Exame {
  _id: ObjectId;
  id: string;
  data: Date;
  tipo: 'espirometria' | 'oximetria';
  detalhes: Espirometria | Oximetria;
}

type chartData = {
  value: number;
  index: number;
};
export interface Espirometria {
  dados: {
    fluxo: chartData[];
    volume: chartData[];
    fluxoPorVolume?: chartData[];
  };
  vef1?: number;
  fluxoMaximo: chartData;
  capacidadeVital: number;
}

export interface Oximetria {
  leituras: number[];
  spo2: number;
}

export default Exame;
