import { Stack, Text, Button, Icon, Flex, Divider } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { PackageButton } from "../PackageButton";

export function SidebarNav() {
  const { data: session } = useSession();

  return (
    <Stack spacing="6" align="flex-start" justify="center" px="6" py="8">
      <Flex
        flexDir="column"
        borderBottom="1px solid #5c5c5c"
        pb="8"
        gap="4"
        align="center"
      >
        <Text fontSize="sm">{session?.user?.email}</Text>
        <Button
          onClick={() => signOut()}
          w="14"
          bg="orange.400"
          _hover={{
            bg: "orange.600",
          }}
        >
          <Icon as={FiLogOut} />
        </Button>
      </Flex>

      <Flex justify="center" w="100%">
        <PackageButton />
      </Flex>
    </Stack>
  );
}
