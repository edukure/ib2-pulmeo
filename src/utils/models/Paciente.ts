import { ObjectId } from 'bson';
import Exame from './Exame';
import Usuario from './Usuario';

interface Paciente extends Usuario {
  role: 'paciente';
  nome: string;
  email: string;
  teveCovid: boolean;
  fumante: boolean;
  doencaRespiratoria: string;
  idade: number;
  peso: number;
  altura: number;
  image: string;
  responsaveis?: ObjectId[];
  exames?: Exame[];
  exameMaisRecente?: {
    data: Date;
    tipo: 'oximetria' | 'espirometria ';
  };
}

export default Paciente;
