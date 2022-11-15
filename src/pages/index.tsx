import {
  AbsoluteCenter,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Form/input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { MagicLinkModal } from "../components/MagicLinkModal";
import { GetServerSideProps } from "next";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/router";
import { errors } from "../utils/constants";

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
  const toast = useToast();
  const { error } = useRouter().query;
  const [errorMessage] = useState(
    error && (errors[String(error)] ?? errors.default)
  );
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
    await signIn("facebook");
  };

  const handleSignInWithGoogle = async () => {
    await signIn("google");
  };

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: "Erro no Login",
        description: errorMessage as String,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }
  }, [errorMessage, toast]);

  return (
    <>
      <Flex
        align="center"
        justify="center"
        maxW={1240}
        h="100vh"
        gap="4"
        p="6"
        mx="auto"
        my={0}
      >
        <Flex flex={1} flexDir="column" gap={8}>
          <Stack spacing={4} maxW={460}>
            <Text fontSize={20} fontWeight="bold">
              Temos que pegar!
            </Text>
            <Text fontSize={36} fontWeight="bold">
              Colecione seus pokémon favoritos em cards incriveis
            </Text>
          </Stack>
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
            <Center position="relative">
              <Divider my="6" />
              <AbsoluteCenter bg="gray.800" px="2">
                <Text fontSize="xs">Ou</Text>
              </AbsoluteCenter>
            </Center>
            <Button
              type="button"
              colorScheme="blue"
              size="md"
              disabled={isSendingMail}
              onClick={handleSignInWithFacebook}
              rightIcon={<Icon as={FaFacebook} />}
            >
              Entrar com Facebook
            </Button>
            <Button
              type="button"
              colorScheme="red"
              mt="6"
              size="md"
              disabled={isSendingMail}
              onClick={handleSignInWithGoogle}
              rightIcon={<Icon as={FaGoogle} />}
            >
              Entrar com Google
            </Button>
          </Flex>
        </Flex>

        <Flex flexDir="column" align="center" flex={1} gap={8}>
          <Image
            src="/assets/poke-logo-2.svg"
            alt="pokemon card collector"
            w="64"
          />
          <Image src="/assets/cards.svg" alt="cards" />
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
