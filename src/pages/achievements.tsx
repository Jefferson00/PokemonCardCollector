import { Flex, Spinner, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { AchievementsComponent } from "../components/AchievementsComponent";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { useAchievements } from "../hooks/useAchievements";

const Achievements = () => {
  const { loadingAchievements } = useAchievements();
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex w="100%" mx="auto" pr={["0", "6"]} flexDir={["column", "row"]}>
      {!isWideVersion && <Header />}
      <Sidebar />
      <Flex minH="100vh" mx="auto" my="6" flexDir="column">
        {loadingAchievements ? <Spinner /> : <AchievementsComponent />}
      </Flex>
    </Flex>
  );
};

export default Achievements;

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
