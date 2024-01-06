import NextLink from "next/link";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../../hook/auth";

export function HeaderBtnComponent({ isLogin }) {
  const { signOut } = useAuth();

  return (
    <>
      {isLogin && (
        <Button
          onClick={signOut}
          color={"white"}
          bgColor={"purple.600"}
          fontWeight="bold"
          fontSize="12px"
          w={"86px"}
          h={"38px"}
          _hover={{
            filter: `brightness(0.9)`,
          }}
          borderRadius={10}
        >
          Logout
        </Button>
      )}
      {!isLogin && (
        <NextLink href="/login" passHref>
          <Button
            color={"white"}
            bgColor={"purple.600"}
            fontWeight="bold"
            fontSize="12px"
          >
            Sign In
          </Button>
        </NextLink>
      )}
    </>
  );
}
