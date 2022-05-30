import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "../components/header/Header";
import { theme } from "../styles/theme";
import "../styles/teste.css";
import { CartProvider } from "../hook/useCart";
import { AuthProvider } from "../hook/auth";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </CartProvider>
  );
}

export default MyApp;
