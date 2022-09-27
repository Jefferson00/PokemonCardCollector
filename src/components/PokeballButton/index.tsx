import {
  Box,
  keyframes,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { usePokemons } from "../../hooks/usePokemons";
import { useSidebarDrawer } from "../../hooks/useSidebarDrawer";
import { BottomSide } from "./BottomSide";
import { Inside } from "./Inside";
import { TopSide } from "./TopSide";

const bounceAnimation = keyframes`
  0% { transform: translateY(-3%)}
  100% { transform: translateY(3%)}
`;

export function PokeballButton() {
  const { onClose } = useSidebarDrawer();
  const {
    handleGetPokemons,
    nextTimeToOpenPackage,
    packageAvailable,
    seconds,
    minutes,
    loading,
  } = usePokemons();
  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  const animation = `${bounceAnimation} 1s ease-in-out infinite alternate	`;

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  const onOpen = async () => {
    if (isDrawerSidebar) onClose();
    await handleGetPokemons();
  };

  return (
    <Stack spacing={6}>
      <Box
        w="9rem"
        h="10rem"
        borderRadius="8px"
        overflow="hidden"
        position="relative"
        border="4px solid"
        borderColor="gray.600"
        bg="gray.800"
        animation={packageAvailable ? animation : "none"}
      >
        <TopSide
          isOpen={!packageAvailable}
          onOpen={onOpen}
          isLoading={loading}
        />
        {!packageAvailable && nextTimeToOpenPackage && (
          <Inside
            minuteLeft={minuteLeft}
            minuteRight={minuteRight}
            secondLeft={secondLeft}
            secondRight={secondRight}
          />
        )}

        <BottomSide isOpen={!packageAvailable} />
      </Box>

      {packageAvailable && <Text textAlign="center">ABRIR NOVO</Text>}
    </Stack>
  );
}
