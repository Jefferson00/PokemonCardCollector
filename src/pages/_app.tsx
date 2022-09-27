import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AlbumProvider } from "../containers/AlbumProvider";
import { PokemonsProvider } from "../containers/PokemonsProvider";

import "../styles/globals.css";

import { theme } from "../styles/theme";
import { SidebarDrawerProvider } from "../containers/SidebarDrawerProvider";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <PokemonsProvider>
            <AlbumProvider>
              <Head>
                <title>Pokémon Card Collector</title>
              </Head>
              <Component {...pageProps} />
            </AlbumProvider>
          </PokemonsProvider>
        </SidebarDrawerProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
