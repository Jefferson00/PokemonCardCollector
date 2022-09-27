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
      <ModalContent bg="gray.700" m="6">
        <ModalHeader>Email enviado</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text textAlign="center">
            Te enviamos um e-amil para <strong>{email}</strong>. Verifique sua
            caixa de entrada e clique no link para realizar o login.
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="orange" mr={3} onClick={onClose}>
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
