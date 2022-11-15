import {
  Flex,
  Heading,
  HStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CompleteIndicator } from "./CompleteIndicator";
import { List } from "./List";
import { Pagination } from "./Pagination";
import { RegionSelector } from "./RegionSelector";

export function Album() {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  return (
    <Flex
      flexDir="column"
      mt="8"
      align="center"
      bg="gray.800"
      borderRadius="20px"
      py="6"
    >
      <HStack spacing="6" position="relative" w="100%" justify="center">
        <CompleteIndicator />
        {/*    <Heading as="h3" size={["md", "lg"]}>
          Meu Album
        </Heading> */}
      </HStack>
      <Pagination />
      {isMobile && <RegionSelector />}
      <List />
      {!isMobile && <RegionSelector />}
    </Flex>
  );
}
