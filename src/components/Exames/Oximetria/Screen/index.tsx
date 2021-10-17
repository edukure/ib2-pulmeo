import { Button, ListItem, Stack, UnorderedList } from '@chakra-ui/react';
import useBluetooth from '@hooks/useBluetooth';
import { useEffect } from 'react';

type OximetriaScreenProps = {
  id: string;
  nome: string;
};

function OximetriaScreen({ id, nome }: OximetriaScreenProps) {
  const { isReady, start, stop, values, isWebBluetoothEnabled, getDeviceInfo } =
    useBluetooth(
      'Pulmeo - Oximetro',
      'df40b603-33dd-4d59-bb53-aef20c08ee67',
      'f89bcd15-58d3-4465-a240-e6420b3ede5e'
    );

  // Service = df40b603-33dd-4d59-bb53-aef20c08ee67

  // Characteristic f89bcd15-58d3-4465-a240-e6420b3ede5e

  // Descriptor fc3cca29-fc97-420c-9bd0-39485cdcdbbc

  useEffect(() => {
    console.log('enabled', isWebBluetoothEnabled());
  }, []);

  const handleClick = async () => {
    await getDeviceInfo().then((info) => console.log(info));
  };

  return (
    <div>
      {id} {nome}
      <Stack>
        <Button colorScheme="blue" onClick={handleClick}>
          Conectar
        </Button>
        <Button
          colorScheme="green"
          onClick={async () => await start()}
          disabled={!isReady}
        >
          start
        </Button>
        <Button colorScheme="red" onClick={() => stop()} disabled={!isReady}>
          stop
        </Button>
      </Stack>
      <UnorderedList>
        {values.map((item) => (
          <ListItem key={item.id}>{item.value}</ListItem>
        ))}
      </UnorderedList>
    </div>
  );
}

export default OximetriaScreen;
