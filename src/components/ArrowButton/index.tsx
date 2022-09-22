import { Button, ButtonProps, Icon } from "@chakra-ui/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ArrowButtonProps extends ButtonProps {
  direction: "left" | "right";
}

export function ArrowButton({ direction, ...rest }: ArrowButtonProps) {
  return (
    <Button
      w="8"
      h="10"
      borderRadius="50%"
      alignSelf="center"
      bg="gray.500"
      {...rest}
    >
      <Icon as={direction === "left" ? FiChevronLeft : FiChevronRight} />
    </Button>
  );
}
