import { ObjectId } from 'bson';

interface Usuario {
  _id: ObjectId;
  id: string;
  nome: string;
  email: string;
  image: string;
  role: 'medico' | 'paciente';
}

export default Usuario;
