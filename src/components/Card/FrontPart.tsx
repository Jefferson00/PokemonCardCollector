import {
  AbsoluteCenter,
  Box,
  Flex,
  Image,
  ScaleFade,
  SlideFade,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { StarShine } from "./StarShine";

interface FrontPartProps {
  sprite: string;
  isShiny?: boolean;
}

export function FrontPart({ sprite, isShiny }: FrontPartProps) {
  const [imageIsLoaded, setIsImageLoaded] = useState(false);

  return (
    <AbsoluteCenter w="40" h="36" top="40%">
      <Box position="relative">
        {!imageIsLoaded && (
          <Flex align="center" justify="center" w="40" h="36">
            <Spinner alignSelf="center" />
          </Flex>
        )}
        <ScaleFade in={true} initialScale={0} delay={0.2}>
          <Image
            onLoad={() => setIsImageLoaded(true)}
            maxW="100%"
            objectFit="cover"
            src={sprite}
            alt="pokemon"
            draggable={false}
            filter={
              isShiny
                ? "drop-shadow(0px 0px 20px #fff)"
                : "drop-shadow(2px 2px 1px #000)"
            }
          />
        </ScaleFade>
        {isShiny && <StarShine />}
      </Box>
    </AbsoluteCenter>
  );
}
