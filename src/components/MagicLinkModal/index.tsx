import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface MagicLinkModalProps {
  email: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MagicLinkModal = ({
  email,
  isOpen,
  onClose,
}: MagicLinkModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="gray.600">
        <ModalHeader>Email enviado</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Te enviamos um e-amil para <strong>{email}</strong>. Verifique sua
            caixa de entrada e clique no link para realizar o login.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
