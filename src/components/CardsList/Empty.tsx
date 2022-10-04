import { AbsoluteCenter, Flex, Image, Text } from "@chakra-ui/react";

export function Empty() {
  return (
    <Flex
      align="center"
      justify="center"
      w="17rem"
      h="32"
      alignSelf="center"
      borderRadius="8px"
      flexDir="column"
    >
      <Image
        src="/assets/empty.png"
        alt="sem cards"
        filter="drop-shadow(2px 2px 3px #000)"
      />
      <Text
        as="strong"
        fontSize="1.25rem"
        position="relative"
        top="-20%"
        left="-5%"
        textTransform="uppercase"
        style={{
          WebkitTextStrokeWidth: 1,
          WebkitTextStrokeColor: "#000",
        }}
      >
        Sem cards por enquanto
      </Text>
    </Flex>
  );
}
