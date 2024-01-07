import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image
  } from '@chakra-ui/react';
import { HeaderBtnComponent } from './btn';
import { useAuth } from '../../hook/auth';
import { useRouter } from 'next/router';

export function NavHeaderComponent({ whitGray, isLogin, hideOrShowDashBtn }) {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <Flex as="nav" alignItems={"center"}>
      <HStack spacing={4}>
      {!!hideOrShowDashBtn && (
        <Button
          colorScheme="cyan"
          color="white"
          fontWeight="bold"
          fontSize="12px"
          borderRadius={10}
          w={"106px"}
          h={"38px"}
          onClick={() => router.push("/dashboard/write")}
        >
          Write now
        </Button>
      )}
      <Box
        as="button"
        height="3rem"
        width="3rem"
        px="8px"
        borderRadius="2rem"
        fontSize="16px"
        justifyContent={"center"}
        alignItems={"center"}
        bg="gray.300"
        _hover={{ bg: "#A9A7B0" }}
        _active={{
          bg: "#A9A7B0",
        }}
        _focus={{
          boxShadow:
            "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
        }}
        onClick={() => router.push("/cart")}
      >
        <Image src="shoppingBag.svg" alt="Carrinho de compras" w={10} h={7} />
      </Box>
      {isLogin && (
        <Avatar
          borderColor={"yellow.300"}
          showBorder
          cursor={"pointer"}
          size={"md"}
          name={user.user.name}
          src={user.user.avatar}
          onClick={() => router.push("/dashboard")}
        />
      )}
      <HeaderBtnComponent isLogin={isLogin} />
      </HStack>
    </Flex>
  );
}
