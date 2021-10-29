/* Web Bluetooth API needs https
  https://blog.eperedo.com/2020/03/22/nextjs-ngrok-easy-https-server/
*/

import { useState, useEffect, useRef, useCallback } from 'react';

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';
type Status = 'idle' | 'reading';

function useBluetooth(deviceName, bleService, bleCharacteristic) {
  const [values, setValues] = useState<{ id: number; value: string }[]>([]);
  const [bluetoothDevice, setBluetoothDevice] = useState<BluetoothDevice>(null);
  const [gattCharacteristic, setGattCharacteristic] =
    useState<BluetoothRemoteGATTCharacteristic>(null);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('disconnected');

  const dataCount = useRef(0);

  useEffect(() => {
    isWebBluetoothEnabled();

    return () => {
      if (gattCharacteristic) {
        gattCharacteristic.stopNotifications().then(() => {
          gattCharacteristic.removeEventListener(
            'characteristicvaluechanged',
            handleChangedValue
          );
        });
      }
    };
  }, []);

  const isWebBluetoothEnabled = useCallback(() => {
    if (!navigator.bluetooth) {
      console.log('Web Bluetooth API is not available in this browser!');
      return false;
    }

    return true;
  }, []);

  const getDeviceInfo = useCallback(async () => {
    const options = {
      optionalServices: [bleService],
      filters: [{ name: deviceName }],
    };

    console.log('Requesting any Bluetooth Device...');
    if (!isWebBluetoothEnabled()) return null;

    const device = await navigator.bluetooth?.requestDevice(options);
    if (!device) {
      setConnectionStatus('disconnected');
      return null;
    }
    setBluetoothDevice(device);
    return device;
  }, []);

  /*
    Connects to GATTServer once the device is set.
  */
  useEffect(() => {
    if (bluetoothDevice) {
      setConnectionStatus('connecting');
      connectGATT();
    }
  }, [bluetoothDevice]);

  /*
    Connecting to GATTServer is asynchronous and takes around 5 seconds.
    The device is ready to transmit data when gattCharacteristic is set.
  */
  useEffect(() => {
    if (gattCharacteristic) {
      setConnectionStatus('connected');
    }
  }, [gattCharacteristic]);

  const connectGATT = useCallback(async () => {
    if (bluetoothDevice?.gatt.connected && !gattCharacteristic) {
      return;
    }

    const server = await bluetoothDevice.gatt.connect();
    const primaryService = await server.getPrimaryService(bleService);
    const characteristic = await primaryService.getCharacteristic(
      bleCharacteristic
    );

    setGattCharacteristic(characteristic);
  }, [bluetoothDevice, gattCharacteristic, connectionStatus]);

  const read = useCallback(async () => {
    if (bluetoothDevice?.gatt.connected && !gattCharacteristic) {
      return;
    }

    return gattCharacteristic.readValue();
  }, [bluetoothDevice, gattCharacteristic]);

  const handleChangedValue = useCallback((event) => {
    const decodedString = new TextDecoder().decode(event.target.value.buffer);
    const resultFromSplit = decodedString.split(';').slice(0, -1);
    const mappedValues = resultFromSplit.map((value) => {
      const id = dataCount.current;
      dataCount.current += 1;
      return {
        id,
        value,
      };
    });

    setValues((prev) => [...prev, ...mappedValues]);
  }, []);

  const start = useCallback(async () => {
    if (connectionStatus === 'connected') {
      gattCharacteristic.addEventListener(
        'characteristicvaluechanged',
        handleChangedValue
      );
      await gattCharacteristic.startNotifications();
      console.log('Start reading...');
    } else {
      console.log('not ready');
    }
  }, [gattCharacteristic, connectionStatus, handleChangedValue]);

  const stop = useCallback(async () => {
    await gattCharacteristic.stopNotifications();
  }, [gattCharacteristic]);

  const disconnect = useCallback(async () => {
    bluetoothDevice?.gatt?.disconnect();
    setConnectionStatus('disconnected');
  }, [bluetoothDevice]);

  return {
    values,
    getDeviceInfo,
    connectGATT,
    start,
    stop,
    isWebBluetoothEnabled,
    bluetoothDevice,
    disconnect,
    connectionStatus,
  };
}

export default useBluetooth;
