import { Box, Text } from "@chakra-ui/react";

interface PokemonNameProps {
  id: number;
  name: string;
}

export function PokemonName({ id, name }: PokemonNameProps) {
  const length = name.length + id.toString().length;

  return (
    <Box position="absolute" bottom="5%" textAlign="center" px="2">
      <Text
        as="strong"
        color="white"
        fontSize={length > 13 ? "1rem" : length > 10 ? "lg" : "xl"}
        textTransform="uppercase"
        style={{
          WebkitTextStrokeWidth: 1,
          WebkitTextStrokeColor: "#000",
        }}
      >
        {id} - {name}
      </Text>
    </Box>
  );
}
