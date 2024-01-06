import { AuthProvider } from "../hook/auth";
import { CartProvider } from "../hook/useCart";
import { ChakraProvider } from "@chakra-ui/react";
import { HeaderComponent } from "../components/header";
import { theme } from "../styles/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <HeaderComponent />
          <Component {...pageProps} />
        </ChakraProvider>
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
      </AuthProvider>
    </CartProvider>
  );
}

export default MyApp;
