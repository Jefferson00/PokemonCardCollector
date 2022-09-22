import { AbsoluteCenter, Box, Progress, Text } from "@chakra-ui/react";
import { useAlbum } from "../../hooks/useAlbum";

export function CompleteIndicator() {
  const { albumCompleteStatus } = useAlbum();

  return (
    <Box w="14" position="relative">
      <Progress
        colorScheme="orange"
        hasStripe
        value={albumCompleteStatus}
        isAnimated
        h="14"
        borderRadius="50%"
      />
      <AbsoluteCenter>
        <Text
          as="strong"
          style={{
            WebkitTextStrokeWidth: 0.5,
            WebkitTextStrokeColor: "#000",
          }}
          fontSize="xl"
        >
          {albumCompleteStatus}%
        </Text>
      </AbsoluteCenter>
    </Box>
  );
}
