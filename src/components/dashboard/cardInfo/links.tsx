import NextLink from "next/link";
import { Box, Center, Flex, Icon } from "@chakra-ui/react";
import { LinksType } from "../../../types/components/cardInfo";

interface Props {
  links?: LinksType[];
}

export function LinksComponent({ links }: Readonly<Props>) {
  return (
    <Flex justifyContent={"space-around"} w="100px" m={5}>
      {links.map((item) => (
        <Box key={item.href} cursor="pointer" borderRadius={2} bgColor={"white"}>
          <NextLink href={item.href} passHref>
            <Center>
              <Icon as={item.icon} w="1.5rem" h="1.5rem" />
            </Center>
          </NextLink>
        </Box>
      ))}
    </Flex>
  );
}
