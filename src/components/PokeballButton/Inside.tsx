import { AbsoluteCenter, Text } from "@chakra-ui/react";

interface InsideProps {
  minuteLeft: string;
  minuteRight: string;
  secondLeft: string;
  secondRight: string;
}

export function Inside({
  minuteLeft,
  minuteRight,
  secondLeft,
  secondRight,
}: InsideProps) {
  return (
    <AbsoluteCenter zIndex={1} textAlign="center" w="100%">
      <Text fontSize="sm">
        {`Próximo pacote disponível em ${minuteLeft}${minuteRight}:${secondLeft}${secondRight}`}
      </Text>
    </AbsoluteCenter>
  );
}
