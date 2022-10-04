import {
  Box,
  Fade,
  Flex,
  HStack,
  Image,
  ScaleFade,
  SlideFade,
  Stack,
} from "@chakra-ui/react";
import { IStats, ITypes } from "../../utils/interfaces";
import { StatBox } from "./StatBox";

interface BackPartProps {
  sprite: string;
  types: ITypes[];
  stats: IStats[];
}

export function BackPart({ sprite, types, stats }: BackPartProps) {
  const getPokeStat = (statName: string) => {
    const baseState = stats.find((stat) => stat.name === statName)?.base_stat;

    return baseState || 0;
  };

  return (
    <Box position="absolute" top={0} w="90%">
      <ScaleFade in={true} initialScale={0} delay={0.2}>
        <Flex w="90%" alignItems="flex-end" justifyContent="space-between">
          <Image w="16" h="16" src={sprite} alt="pokemon" draggable={false} />
          <Flex alignItems="center">
            <HStack>
              {types.map((type, index) => (
                <Image
                  w="9"
                  h="9"
                  src={`/assets/type_icons/TYPE_${type.name.toUpperCase()}.png`}
                  alt={type.name.toUpperCase()}
                  draggable={false}
                  key={index}
                />
              ))}
            </HStack>
          </Flex>
        </Flex>

        <Flex flexDir="column" mt="3">
          <Stack spacing="2" alignItems="center">
            <StatBox title="ataque" baseStat={getPokeStat("attack")} />
            <StatBox title="defesa" baseStat={getPokeStat("defense")} />
            <StatBox title="velocidade" baseStat={getPokeStat("speed")} />
            <StatBox title="hp" baseStat={getPokeStat("hp")} />
          </Stack>
        </Flex>
      </ScaleFade>
    </Box>
  );
}
