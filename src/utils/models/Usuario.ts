interface Usuario {
  id: string;
  nome: string;
  email: string;
  image: string;
  role: 'medico' | 'paciente';
}

export default Usuario;
