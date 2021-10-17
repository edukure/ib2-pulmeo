import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalCloseButton,
} from '@chakra-ui/react';
import ListaPacientes from './ListaPacientes';

type ModalPacientesProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ModalPacientes({ isOpen, onClose }: ModalPacientesProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Lista de Pacientes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ListaPacientes />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" onClick={onClose}>
            fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalPacientes;
