import { Image, Progress, Text, Tooltip, VStack } from "@chakra-ui/react";
import { AchievementProps } from "../../../containers/AchievementsProvider";

export function Item({
  achievement,
  level,
  levelValue,
  title,
  tooltip,
  min,
  max,
}: AchievementProps) {
  return (
    <VStack spacing="4">
      <Text as="strong" fontSize="lg">
        {title}
      </Text>
      <Tooltip label={tooltip}>
        <Image
          src={`/assets/achievements/${level}/${achievement}.svg`}
          alt={title}
        />
      </Tooltip>
      <Progress
        max={max}
        min={min}
        value={levelValue}
        w="full"
        size="xs"
        colorScheme="orange"
        rounded="base"
        bg="gray.600"
      />
    </VStack>
  );
}
