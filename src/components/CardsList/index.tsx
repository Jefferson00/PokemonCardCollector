import {
  Button,
  Flex,
  HStack,
  Icon,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import Draggable from "react-draggable";
import { FiLayers, FiRepeat } from "react-icons/fi";
import { useAlbum } from "../../hooks/useAlbum";
import { usePokemons } from "../../hooks/usePokemons";
import { ArrowButton } from "../ArrowButton";
import Card from "../Card";

export function CardsList() {
  const {
    maxCards,
    minCards,
    pokemonListState,
    repeatedCards,
    loading,
    handleChangeCards,
    handleSortCards,
    handleTradeCard,
  } = usePokemons();
  const { handleStopDrag } = useAlbum();

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const getLoadingSkeleton = () => {
    const skeletonQtd = isMobile ? 1 : 5;
    const skeletonArray = [];
    for (let i = 0; i < skeletonQtd; i++) {
      skeletonArray.push(
        <Skeleton
          key={i}
          height="16.4rem"
          w="11.5rem"
          startColor="gray.500"
          endColor="gray.600"
        />
      );
    }
    return skeletonArray;
  };

  return (
    <Flex
      justify="center"
      align={["center"]}
      flexDir={["column", "row"]}
      w="100%"
      minH="262px"
      my="0"
      mx="auto"
      bg="gray.800"
      borderRadius="20px"
      p="4"
      gap="8"
    >
      {!loading && (
        <HStack>
          <ArrowButton
            onClick={() => handleChangeCards("prev")}
            direction="left"
            disabled={minCards <= 0}
          />
          <HStack zIndex={999}>
            {pokemonListState
              .slice(minCards, maxCards)
              .map((pokemon, index) => (
                <Draggable
                  key={pokemon.unique_id}
                  handle=".handle"
                  defaultPosition={{ x: 0, y: 0 }}
                  scale={1}
                  onStop={(_, ui) => {
                    handleStopDrag(ui, pokemon.id, pokemon.unique_id);
                  }}
                >
                  <div className="handle">
                    <Card pokemon={pokemon} />
                  </div>
                </Draggable>
              ))}
          </HStack>
          <ArrowButton
            onClick={() => handleChangeCards("next")}
            direction="right"
            disabled={maxCards >= pokemonListState.length}
          />
        </HStack>
      )}

      {pokemonListState.length > 0 && !loading && (
        <Stack direction={["row", "column"]} justify={["center", "flex-start"]}>
          <Tooltip label="Organizar" placement="top">
            <Button
              bg="orange.400"
              _hover={{ bg: "orange.600" }}
              onClick={() => handleSortCards()}
            >
              <Icon as={FiLayers} />
            </Button>
          </Tooltip>
          {pokemonListState.length >= 5 && (
            <Tooltip label="Solicitar troca" placement="top">
              <Button
                disabled={repeatedCards.length < 5}
                bg="orange.400"
                _hover={{ bg: "orange.600" }}
                onClick={() => handleTradeCard()}
              >
                <Icon as={FiRepeat} />
              </Button>
            </Tooltip>
          )}
        </Stack>
      )}

      {pokemonListState.length === 0 && !loading && (
        <Flex
          align="center"
          justify="center"
          bg="gray.600"
          w="64"
          h="32"
          alignSelf="center"
          borderRadius="8px"
        >
          <Text as="h2">Sem cards por enquanto</Text>
        </Flex>
      )}

      {loading && <HStack>{getLoadingSkeleton()}</HStack>}
    </Flex>
  );
}
