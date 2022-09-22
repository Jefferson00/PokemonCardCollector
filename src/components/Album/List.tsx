import {
  AbsoluteCenter,
  Box,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { useAlbum } from "../../hooks/useAlbum";
import { IAlbum } from "../../utils/interfaces";
import Card from "../Card";

export function List() {
  const { albumState, max, min, refs } = useAlbum();

  return (
    <Flex justify="center" flexWrap="wrap" w="100%" mt="8" gap="8" maxW="71rem">
      {albumState.slice(min, max).map((state, index) => (
        <Flex
          bg="orange.400"
          w="11.5rem"
          h="16.4rem"
          justify="center"
          alignItems="center"
          borderRadius="20px"
          key={state.id}
          ref={refs.current[state.id - 1]}
        >
          {state.pokemon ? (
            <Card pokemon={state.pokemon} onAlbum />
          ) : (
            <Flex position="relative">
              <Image
                src="/assets/pokeball.svg"
                alt={String(state.id)}
                filter="brightness(0.8)"
                zIndex={0}
              />
              <AbsoluteCenter>
                <Text
                  as="strong"
                  fontSize="24"
                  style={{
                    WebkitTextStrokeWidth: 1,
                    WebkitTextStrokeColor: "#000",
                  }}
                  textShadow="0 0 8px white"
                >
                  {state.id}
                </Text>
              </AbsoluteCenter>
            </Flex>
          )}
        </Flex>
      ))}
    </Flex>
  );
}
