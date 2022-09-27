import { Flex, keyframes } from "@chakra-ui/react";
import { ReactNode } from "react";
import { getBackgroundColorFromType } from "../../utils/getBackgroundColorFromType";

interface ContainerProps {
  children: ReactNode;
  typeName: string;
  isShine?: boolean;
  isNew?: boolean;
  onDoubleClick: () => void;
}

const shineAnimation = keyframes`
  0% {
  top: -30%;
    left: -30%;
}
	100% {
    top: -110%;
    left: -210%;
  }
`;

export function Container({
  children,
  onDoubleClick,
  typeName,
  isShine = false,
  isNew = false,
}: ContainerProps) {
  const animation = `${shineAnimation} 1.5s ease 1s infinite alternate-reverse`;

  return (
    <Flex
      w="11.5rem"
      h="16.4rem"
      bg={getBackgroundColorFromType(typeName)}
      borderRadius="20px"
      pos="relative"
      flexDir="column"
      justify="stretch"
      align="center"
      py="0.5rem"
      overflow="hidden"
      cursor="pointer"
      border={isNew ? "1px solid #fff" : "none"}
      boxShadow={isNew ? "0 0 5px #fff" : "none"}
      onDoubleClick={onDoubleClick}
      _after={{
        content: "''",
        display: isShine ? "block" : "none",
        position: "absolute",
        top: "-110%",
        left: "-210%",
        width: "200%",
        height: "200%",
        transform: "rotate(30deg)",
        bgGradient:
          "linear(to-r, rgba(255, 255, 255, 0) 0%,  rgba(255, 255, 255, 0.13) 77%, rgba(255, 255, 255, 0.5) 92%,   rgba(255, 255, 255, 0) 100%)",
        animation,
      }}
    >
      {children}
    </Flex>
  );
}
