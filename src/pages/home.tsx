import { Flex } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { Album } from "../components/Album";
import { CardsList } from "../components/CardsList";
import { Sidebar } from "../components/Sidebar";
import { getSession } from "next-auth/react";

const Homepage: NextPage = () => {
  return (
    <Flex w="100%" mx="auto" pr="6">
      <Sidebar />
      <Flex minH="100vh" mx="auto" my="6" flexDir="column">
        <CardsList />

        <Album />
      </Flex>
    </Flex>
  );
};

export default Homepage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};
