import React from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Box,
} from '@chakra-ui/react';

import HeaderPaciente from '@components/Paciente/Header';
import ExamesTable from '@components/Paciente/ExamesTable';
import NovoExame from '@components/Paciente/NovoExame';
import Paciente from '@utils/models/Paciente';
import PanelOximetria from '../PanelOximetria';

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
      {/* {role === 'paciente' && <NovoExame />} */}

      {/*  listagem dos exames */}
      <Box
        maxW="container.md"
        w="full"
        bg="white"
        rounded="lg"
        overflow="hidden"
      >
        <Tabs isFitted variant="enclosed-colored">
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>Oximetria</Tab>
            <Tab _selected={{ color: 'white', bg: 'orange.500' }}>
              Espirometria
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <PanelOximetria
                exames={[
                  {
                    id: '1',
                    spo2: 98,
                    data: new Date(),
                  },
                  {
                    id: '2',
                    spo2: 88,
                    data: new Date(),
                  },
                  {
                    id: '3',
                    spo2: 93,
                    data: new Date(),
                  },
                ]}
                role={role}
              />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Stack>
  );
}

export default PacienteScreen;
