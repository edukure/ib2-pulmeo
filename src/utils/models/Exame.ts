import { ObjectId } from 'bson';

interface Exame {
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
  id: string;
  data: Date;
  tipo: 'espirometria';
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
  id: string;
  data: Date;
  tipo: 'oximetria';
  detalhes: {
    spo2: number;
  };
}

export default Exame;
