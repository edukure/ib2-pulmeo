import { ObjectId } from 'bson';
import Usuario from './Usuario';

interface Medico extends Usuario {
  role: 'medico';
  crm: string;
  pacientes: ObjectId[];
}

export default Medico;
