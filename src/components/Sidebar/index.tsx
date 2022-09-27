import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useBreakpointValue,
  DrawerCloseButton,
  DrawerBody,
} from "@chakra-ui/react";

import { SidebarNav } from "./SidebarNav";

import { useSidebarDrawer } from "../../hooks/useSidebarDrawer";

export function Sidebar() {
  const { isOpen, onClose } = useSidebarDrawer();

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.700" p="4">
            <DrawerCloseButton mt="6" />

            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

  return (
    <Box as="aside" w="64" mr="8" bg="gray.800">
      <SidebarNav />
    </Box>
  );
}
