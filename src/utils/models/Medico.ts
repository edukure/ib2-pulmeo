import Paciente from './Paciente';
import Usuario from './Usuario';

interface Medico extends Usuario {
  role: 'medico';
  crm: string;
  pacientes: Pick<Paciente, 'nome' | 'id' | 'exameMaisRecente'>[];
}

export default Medico;
