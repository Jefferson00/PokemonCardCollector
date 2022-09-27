import { Flex, Icon, IconButton, Image } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { useSidebarDrawer } from "../../hooks/useSidebarDrawer";

export function Header() {
  const { onOpen } = useSidebarDrawer();

  return (
    <Flex justify="space-between" align="center" px="6">
      <Flex justify="center" w="8rem">
        <Image src="/assets/poke-logo-2.svg" alt="logo" />
      </Flex>

      <IconButton
        icon={<Icon as={FiMenu} />}
        variant="unstyled"
        onClick={onOpen}
        fontSize="24"
        aria-label="Open Menu"
      ></IconButton>
    </Flex>
  );
}
