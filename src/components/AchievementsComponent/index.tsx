import { Flex, Heading } from "@chakra-ui/react";
import { useAchievements } from "../../hooks/useAchievements";
import { Item } from "./Item";

export function AchievementsComponent() {
  const { achievements } = useAchievements();

  return (
    <Flex
      flexDir="column"
      align="center"
      justify="center"
      borderRadius="20px"
      mt="8"
      bg="gray.800"
      py="8"
      px="16"
      w="full"
    >
      <Heading as="h3" size={["md", "lg"]}>
        Minhas conquistas
      </Heading>

      <Flex gap="10" mt="8" flexWrap="wrap" justify="center">
        {achievements.map((ach) => (
          <Item
            level={ach.level}
            achievement={ach.achievement}
            levelValue={ach.levelValue}
            title={ach.title}
            tooltip={ach.tooltip}
            min={ach.min}
            max={ach.max}
            key={Math.random()}
          />
        ))}
      </Flex>
    </Flex>
  );
}
