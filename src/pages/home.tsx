import { Flex, useBreakpointValue } from "@chakra-ui/react";
import type { GetServerSideProps, NextPage } from "next";
import { Album } from "../components/Album";
import { CardsList } from "../components/CardsList";
import { Sidebar } from "../components/Sidebar";
import { getSession } from "next-auth/react";
import { Header } from "../components/Header";

const Homepage: NextPage = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex w="100%" mx="auto" pr={["0", "6"]} flexDir={["column", "row"]}>
      {!isWideVersion && <Header />}
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
  const error = ctx.query?.error;

  if (!session?.user) {
    if (error) {
      return {
        redirect: {
          destination: `/?error=${error}`,
          permanent: false,
        },
      };
    }
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
