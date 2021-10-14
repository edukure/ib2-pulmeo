import React from 'react';
import { Stack } from '@chakra-ui/react';

import HeaderPaciente from '@components/Paciente/Header';
import ExamesTable from '@components/Paciente/ExamesTable';
import NovoExame from '@components/Paciente/NovoExame';
import Paciente from '@utils/models/Paciente';

type PacienteScreenProps = {
  role: 'paciente' | 'medico';
  paciente: Paciente;
};

function PacienteScreen({ paciente, role }: PacienteScreenProps) {
  return (
    <Stack w="full" spacing={8}>
      {/*  cabeçalho com info do paciente */}
      <HeaderPaciente {...paciente} />

      {/*  Realizar novo exame oximetria ou espirometria */}
      {/*  renderizar condicionalmente se é paciente ou nao */}
      {role === 'paciente' && <NovoExame />}

      {/*  listagem dos exames */}
      <ExamesTable exames={paciente.exames} idPaciente={paciente.id} />
    </Stack>
  );
}

export default PacienteScreen;
