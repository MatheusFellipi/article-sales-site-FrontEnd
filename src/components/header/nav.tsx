import NextLink from "next/link";
import {
  Image,
  Box,
  Flex,
  Button,
  Center,
  Avatar,
  HStack,
} from "@chakra-ui/react";
import { HeaderBtnComponent } from "./btn";
import { useAuth } from "../../hook/auth";

export function NavHeaderComponent({ whitGray, isLogin, hideOrShowDashBtn }) {
  const { user } = useAuth();

  return (
    <Flex alignItems={"center"}>
      <HStack spacing="8">
        {!!hideOrShowDashBtn && (
          <NextLink href="/dashboard/write" passHref>
            <Button
              colorScheme="cyan"
              color="white"
              fontWeight="bold"
              fontSize="12px"
              borderRadius={10}
              w={"106px"}
              h={"38px"}
            >
              Write now
            </Button>
          </NextLink>
        )}
        <Box
          as="button"
          height="3rem"
          width="3rem"
          px="8px"
          borderRadius="2rem"
          fontSize="16px"
          bg="gray.300"
          _hover={{ bg: "#A9A7B0" }}
          _active={{
            bg: "#A9A7B0",
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
          }}
        >
          <NextLink href="/cart" passHref>
            <Center>
              <Image
                src="ShoopingBag.svg"
                alt="Carrinho de compras"
                w={7}
                h={7}
              />
            </Center>
          </NextLink>
        </Box>
        {isLogin && (
          <NextLink href="/dashboard" passHref>
            <Avatar
              borderColor={"yellow.300"}
              showBorder
              cursor={"pointer"}
              size={"md"}
              name={user.user.name}
              src={user.user.avatar}
            />
          </NextLink>
        )}
        <HeaderBtnComponent isLogin={isLogin} />
      </HStack>
    </Flex>
  );
}
