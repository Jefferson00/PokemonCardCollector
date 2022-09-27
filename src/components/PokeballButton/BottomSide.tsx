import { Box } from "@chakra-ui/react";

interface BottomSideProps {
  isOpen: boolean;
}

export function BottomSide({ isOpen }: BottomSideProps) {
  return (
    <Box
      borderTop="6px solid"
      borderColor="gray.600"
      transition="all 0.4s"
      bg="white"
      h="5rem"
      transform={isOpen ? "translateY(60%)" : "translateY(0)"}
      position="absolute"
      zIndex={2}
      w="100%"
      bottom={0}
    />
  );
}
