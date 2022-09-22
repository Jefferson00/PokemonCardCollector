import { Box, Image } from "@chakra-ui/react";

interface TypeBackgroundProps {
  isDoubleType?: boolean;
  typeName: string;
  position: "top" | "bottom";
}

export function TypeBackground({
  isDoubleType,
  typeName,
  position,
}: TypeBackgroundProps) {
  return (
    <Box w="90%" h="45%" flex={1}>
      <Image
        borderRadius={20}
        borderBottomLeftRadius={isDoubleType && position === "top" ? 0 : 20}
        borderBottomRightRadius={isDoubleType && position === "top" ? 0 : 20}
        borderTopLeftRadius={isDoubleType && position === "bottom" ? 0 : 20}
        borderTopRightRadius={isDoubleType && position === "bottom" ? 0 : 20}
        src={`/assets/type_backgrounds/bg_${typeName}.png`}
        alt="pokemon"
        draggable={false}
        w="100%"
        h="100%"
        objectFit="fill"
        filter="brightness(0.9)"
      />
    </Box>
  );
}
