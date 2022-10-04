import { Button, Flex, HStack, Icon, Stack, Tooltip } from "@chakra-ui/react";
import { FiInfo, FiLayers, FiRepeat } from "react-icons/fi";
import { usePokemons } from "../../hooks/usePokemons";

export function OptionList() {
  const { repeatedCards, handleSortCards, handleTradeCard } = usePokemons();

  return (
    <Stack direction={["row", "column"]} justify={["center", "flex-start"]}>
      <Tooltip label="Organizar" placement="top" py="2">
        <Button
          bg="orange.400"
          _hover={{ bg: "orange.600" }}
          onClick={() => handleSortCards()}
          w="12"
        >
          <Icon as={FiLayers} />
        </Button>
      </Tooltip>

      <HStack align="center">
        <Tooltip label="Solicitar troca" placement="top" py="2">
          <Button
            disabled={repeatedCards.length < 5}
            bg="orange.400"
            _hover={{ bg: "orange.600" }}
            onClick={() => handleTradeCard()}
          >
            <Icon as={FiRepeat} />
          </Button>
        </Tooltip>

        <Tooltip
          label="A cada 5 Cards selecionados para troca, você recebe um Card novo."
          placement="top"
          textAlign="center"
          py="2"
        >
          <Flex>
            <Icon as={FiInfo} fontSize="xl" />
          </Flex>
        </Tooltip>
      </HStack>
    </Stack>
  );
}
