import "react-toastify/dist/ReactToastify.css";
import "../shared/styles/table.css";

import dynamic from "next/dynamic";
import { AuthProvider } from "../hook/auth";
import { CartProvider } from "../hook/useCart";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { ToastContainer } from "react-toastify";

const HeaderComponent = dynamic(() => import("../components/header"), {
  ssr: false,
});

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <ChakraProvider theme={theme}>
          <HeaderComponent />
          <Component {...pageProps} />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
        </ChakraProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
