import { AbsoluteCenter, Box, Progress, Text } from "@chakra-ui/react";
import { useAlbum } from "../../hooks/useAlbum";

export function CompleteIndicator() {
  const { albumCompleteStatus } = useAlbum();

  return (
    <Box w="14" position="absolute" right="5%" top={["5px", "5%"]}>
      <Progress
        colorScheme="orange"
        bgColor="gray.600"
        hasStripe
        value={albumCompleteStatus}
        isAnimated
        h="14"
        borderRadius="50%"
      />
      <AbsoluteCenter>
        <Text as="strong" fontSize={["lg", '"xl"']}>
          {albumCompleteStatus}%
        </Text>
      </AbsoluteCenter>
    </Box>
  );
}
