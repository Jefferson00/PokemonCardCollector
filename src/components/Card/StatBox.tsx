import { Flex, Text } from "@chakra-ui/react";

interface StatBoxProps {
  title: string;
  baseStat: number;
}

export function StatBox({ baseStat, title }: StatBoxProps) {
  return (
    <Flex
      justify="space-between"
      bg="rgba(217, 217, 217, 0.61)"
      p={0.5}
      pr={2}
      pl={2}
      w="90%"
    >
      <Text
        as="strong"
        color="orange.400"
        textTransform="uppercase"
        style={{ WebkitTextStrokeWidth: 0.5, WebkitTextStrokeColor: "#000" }}
      >
        {title}:
      </Text>
      <Text as="strong" color="white">
        {baseStat}
      </Text>
    </Flex>
  );
}
