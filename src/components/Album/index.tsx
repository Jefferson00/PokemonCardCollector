import { Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { CompleteIndicator } from "./CompleteIndicator";
import { List } from "./List";
import { Pagination } from "./Pagination";
import { RegionSelector } from "./RegionSelector";

export function Album() {
  return (
    <Flex flexDir="column" mt="8" align="center">
      <HStack>
        <Heading as="h3" size="lg">
          Meu Album
        </Heading>

        <CompleteIndicator />
      </HStack>
      <Pagination />
      <List />
      <RegionSelector />
    </Flex>
  );
}
