import { Stack, Text, Button, Icon, Flex, Image } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FaInfoCircle, FaLayerGroup, FaMedal } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { PokeballButton } from "../PokeballButton";
import { Link } from "./Link";

export function SidebarNav() {
  const { data: session } = useSession();
  const { route } = useRouter();

  return (
    <Stack spacing="6" align="flex-start" justify="center" px="6" py="8">
      <Flex justify="center" w="100%" borderBottom="1px solid #5c5c5c">
        <Image src="/assets/poke-logo-2.svg" alt="logo" />
      </Flex>

      <Flex justify="center" w="100%">
        {route === "/home" && <PokeballButton />}
      </Flex>

      <Flex justify="center" w="100%" flexDir="column" gap="4">
        {route !== "/home" && (
          <Link icon={FaLayerGroup} title="Meus Cards" link="/" />
        )}
        {route !== "/achievements" && (
          <Link icon={FaMedal} title="Minhas conquistas" link="/achievements" />
        )}
        {route !== "/sobre" && (
          <Link icon={FaInfoCircle} title="Sobre" link="/sobre" />
        )}
      </Flex>

      <Flex
        w="100%"
        flexDir="column"
        borderTop="1px solid #5c5c5c"
        pt="8"
        gap="4"
        align="center"
      >
        <Text fontSize="sm">{session?.user?.email}</Text>
        <Button
          onClick={() => signOut()}
          w="13"
          bg="orange.400"
          _hover={{
            bg: "orange.600",
          }}
        >
          <Icon as={FiLogOut} />
        </Button>
      </Flex>
    </Stack>
  );
}
