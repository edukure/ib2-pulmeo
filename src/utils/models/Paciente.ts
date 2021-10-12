import Exame from './Exame';
import Medico from './Medico';
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
  responsaveis: Pick<Medico, 'nome' | 'id'>[];
  exames: Exame[];
  exameMaisRecente: {
    data: Date;
    tipo: 'oximetria' | 'espirometria ';
  };
}

export default Paciente;
