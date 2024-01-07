import { Button } from "@chakra-ui/react";
import { useAuth } from "../../hook/auth";
import { useRouter } from "next/router";

export function HeaderBtnComponent({ isLogin }) {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <div>
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
        <Button
          color={"white"}
          bgColor={"purple.600"}
          fontWeight="bold"
          fontSize="12px"
          onClick={() => router.push("/login")}
        >
          Sign In
        </Button>
      )}
    </div>
  );
}
