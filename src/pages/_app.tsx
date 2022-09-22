import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AlbumProvider } from "../containers/AlbumProvider";
import { PokemonsProvider } from "../containers/PokemonsProvider";

import "../styles/globals.css";

import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <PokemonsProvider>
        <AlbumProvider>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </AlbumProvider>
      </PokemonsProvider>
    </SessionProvider>
  );
}

export default MyApp;
