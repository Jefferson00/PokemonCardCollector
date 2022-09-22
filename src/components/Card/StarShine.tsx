import { Box, Image, keyframes } from "@chakra-ui/react";

const spin = keyframes`
  0% { transform: scale(0.1) rotate(-200deg); }
  55% { transform: scale(1.2) rotate(180deg); }
  100% { transform:  scale(0.1) rotate(-200deg); }
`;

export function StarShine() {
  const generateShineStar = () => {
    let stars = [];
    let topPositions = ["50%", "30%", "10%", "80%", "40%", "90%"];
    let leftPositions = ["40%", "20%", "40%", "30%", "60%", "65%"];

    for (let i = 0; i < 6; i++) {
      stars.push(
        <Image
          transform={"scale(0)"}
          transition="all 0.4s ease-in-out"
          animation={`${spin} 5s infinite ${i}s`}
          src="/assets/star.png"
          alt="shine"
          w="2rem"
          opacity={0.8}
          position="absolute"
          top={topPositions[i]}
          left={leftPositions[i]}
        />
      );
    }
    return stars;
  };

  return (
    <Box position="absolute" top={0}>
      <Box position="relative" w="40" h="36">
        {generateShineStar()}
      </Box>
    </Box>
  );
}
