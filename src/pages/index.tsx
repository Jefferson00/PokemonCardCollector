import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Form/input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { MagicLinkModal } from "../components/MagicLinkModal";
import { GetServerSideProps } from "next";

interface SignInFormProps {
  email: string;
}

const signInFormSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("O campo precisa ser um email válido"),
});

const Home = () => {
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<any> = async (data: SignInFormProps) => {
    setIsSendingMail(true);
    setEmail(data.email);
    try {
      await signIn("email", {
        email: data.email,
        redirect: false,
        callbackUrl: `${window.location.origin}/home`,
      });
      setShowModal(true);
    } catch (error) {
      alert(`Ocorreu um erro: ${error}`);
    } finally {
      setIsSendingMail(false);
    }
  };

  const handleSignInWithFacebook = async () => {
    try {
      await signIn("facebook");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Flex
        align="center"
        justify="center"
        w="100vw"
        h="100vh"
        flexDir="column"
        gap="4"
        p="6"
      >
        <Image
          src="/assets/poke-logo-2.svg"
          alt="pokemon card collector"
          w="96"
        />

        <Flex
          as="form"
          w="100%"
          maxW={400}
          bg="gray.800"
          p="6"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              label="E-mail"
              type="email"
              error={formState.errors.email}
              {...register("email")}
            />
          </Stack>
          <Button
            type="submit"
            mt="6"
            colorScheme="orange"
            size="md"
            isLoading={isSendingMail}
          >
            Entrar
          </Button>
          <Button
            type="button"
            mt="6"
            colorScheme="blue"
            size="md"
            isLoading={isSendingMail}
            onClick={handleSignInWithFacebook}
          >
            Entrar com Facebook
          </Button>
        </Flex>
      </Flex>
      <MagicLinkModal
        email={email}
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session?.user) {
    return {
      redirect: {
        destination: "/home",
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
