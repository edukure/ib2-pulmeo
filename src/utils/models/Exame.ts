import { ObjectId } from 'bson';

interface Exame {
  _id: ObjectId;
  id: string;
  data: Date;
  tipo: 'espirometria' | 'oximetria';
  detalhes: Espirometria | Oximetria;
}

export interface Espirometria {
  dados: {
    fluxo: number[];
    volume: number[];
    fluxoPorVolume: number[];
  };
  vef1: number;
  fluxoMaximo: number;
}

export interface Oximetria {
  leituras: number[];
  spo2: number;
}

export default Exame;
