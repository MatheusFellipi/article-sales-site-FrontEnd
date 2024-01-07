import { Image, Box, Flex } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { NavHeaderComponent } from "./nav";

export default function HeaderComponent() {
  const route = useRouter();
  const [whitGray, setWhitGray] = useState<boolean>(false);
  const [hideOrShow, setHideOrShow] = useState<boolean>(false);
  const [hideOrShowDashBtn, setHideOrShowDashBtn] = useState<boolean>(false);

  const [isLogin, setIsLogin] = useState<boolean>(() => {
    const { ["togdesign:token"]: token } = parseCookies();
    if (token) {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    route.route === "/cart" ? setWhitGray(false) : setWhitGray(true);
    route.route === "/dashboard/write"
      ? setHideOrShow(true)
      : setHideOrShow(false);

    if (route.route === "/login") {
      setHideOrShow(true);
    } else {
      setHideOrShow(false);
    }
    if (
      route.route === "/dashboard" ||
      route.route === "/dashboard/published" ||
      route.route === "/dashboard/purchased"
    ) {
      setHideOrShowDashBtn(true);
    } else {
      setHideOrShowDashBtn(false);
    }
    const { ["togdesign:token"]: token } = parseCookies();
    if (token !== undefined) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [route.route]);

  return (
    <Flex
      hidden={hideOrShow}
      as="header"
      justifyContent={"space-between"}
      height={"120px"}
      pr={20}
      pl={20}
      pt={6}
    >
      <Box cursor="pointer" w="10rem">
        <NextLink href="/" passHref>
          <Image src="tog.svg" alt="tog design" />
        </NextLink>
      </Box>
      <NavHeaderComponent
        whitGray={whitGray}
        isLogin={isLogin}
        hideOrShowDashBtn={hideOrShowDashBtn}
      />
    </Flex>
  );
}
