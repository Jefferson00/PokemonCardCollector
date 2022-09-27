import { Box, Button } from "@chakra-ui/react";

interface TopSideProps {
  isOpen: boolean;
  isLoading?: boolean;
  onOpen: () => Promise<void>;
}

export function TopSide({ isOpen, onOpen, isLoading = false }: TopSideProps) {
  return (
    <Box
      bg="red.500"
      h="5rem"
      position="relative"
      borderBottom="6px solid"
      borderColor="gray.600"
      transition="all 0.4s"
      transform={isOpen ? "translateY(-60%)" : "translateY(0)"}
      zIndex={3}
    >
      <Button
        isLoading={isLoading}
        _loading={{
          color: "gray.300",
        }}
        onClick={onOpen}
        disabled={isOpen || isLoading}
        position="absolute"
        bottom="-60%"
        transform="translateY(-30%)"
        mx="auto"
        my={0}
        left={0}
        right={0}
        h="3rem"
        w="3rem"
        borderRadius="50%"
        p={0}
        border="8px solid"
        borderColor="gray.600"
        bg="white"
        boxShadow="inset 0 0 0px 5px #d5d4d4"
        _hover={{
          bg: "white",
        }}
        _active={{
          bg: "white",
          border: "9.8px solid",
          borderColor: "gray.600",
        }}
        _disabled={{
          opacity: 1,
          cursor: "not-allowed",
        }}
      ></Button>
    </Box>
  );
}
