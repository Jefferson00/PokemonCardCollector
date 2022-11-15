import { Button, Flex, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { IconType } from "react-icons";

interface LinkProps {
  link?: string;
  title: string;
  icon: IconType;
}

export function Link({ link, icon: Icons, title }: LinkProps) {
  return (
    <NextLink href={{ pathname: link }}>
      <Button
        type="button"
        colorScheme="gray"
        bg="gray.700"
        size="md"
        fontSize="sm"
        rightIcon={<Icon as={Icons} />}
      >
        <Flex flex={1} justifyContent="center">
          {title}
        </Flex>
      </Button>
    </NextLink>
  );
}
