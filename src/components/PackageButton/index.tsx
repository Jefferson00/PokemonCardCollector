import { Button, Flex, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect } from "react";
import { usePokemons } from "../../hooks/usePokemons";

export function PackageButton() {
  const {
    handleGetPokemons,
    nextTimeToOpenPackage,
    packageAvailable,
    seconds,
    minutes,
  } = usePokemons();

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <Flex justifyContent="center" p="6">
      <Button
        onClick={handleGetPokemons}
        disabled={!packageAvailable}
        w="24"
        h="28"
        borderRadius="8px"
        border="4px solid"
        borderTop="10px solid"
        borderColor="orange.400"
        color="orange.400"
        _hover={{
          background: "rgba(249, 195, 60, 1)",
          color: "white",
        }}
        _active={{
          background: "rgba(249, 195, 60, 1)",
          color: "white",
        }}
        bg="white"
        whiteSpace="normal"
        px="2"
      >
        {packageAvailable && <Text fontSize="sm">Abrir novo</Text>}
        {!packageAvailable && nextTimeToOpenPackage && (
          <Text fontSize="sm">
            {`Próximo pacote disponível em ${minuteLeft}${minuteRight}:${secondLeft}${secondRight}`}
          </Text>
        )}
      </Button>
    </Flex>
  );
}
