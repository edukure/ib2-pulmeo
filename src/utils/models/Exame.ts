interface Exame {
  id: string;
  data: Date;
  tipo: 'espirometria' | 'oximetria';
  detalhes: Espirometria | Oximetria;
}

export interface Espirometria {
  leituras: number[];
  valorMedio: number;
}

export interface Oximetria {
  leituras: number[];
  valorMedio: number;
  valorMaximo: number;
  valorMinimo: number;
}

export default Exame;
