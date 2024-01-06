import {
  Box,
  Image,
  Badge,
  Text,
  Avatar,
  Flex,
  Stack,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { getMonth, getYear } from "date-fns";

import { useState } from "react";
import { ArticlesProps } from "../../types/articles";
import { ModalArticleReading } from "./reading";

export function Articles({ article }: Readonly<ArticlesProps>) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [idArticle, setIdArticle] = useState<string>("");

  const handleOpenModalClick = (id: string) => {
    setIdArticle(id);
    onOpen();
  };

  return (
    <>
      {article.map((item) => (
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          cursor={"pointer"}
          key={item.id}
          maxW="412px"
          w="412px"
          h={"412px"}
          margin="5"
          borderWidth="1px"
          bg="white"
          borderRadius="lg"
          overflow="hidden"
          onClick={() => handleOpenModalClick(item.id)}
        >
          <Image
            src="https://img.freepik.com/vetores-gratis/paisagem-de-planeta-alienigena-fundo-marciano_107791-1781.jpg?t=st=1647618475~exp=1647619075~hmac=aadf3e302b96d6d2e7e5a6873d66f5e4e2611c1fb7bd821da85d60418e6e96c1&w=1380"
            alt={item.title}
          />

          <Box padding={"3"}>
            <Box h={"74px"} as="h4">
              <Text fontSize="35px" fontWeight="500">
                {item.title}
              </Text>
            </Box>
            <Flex mt="0.5rem" justify="flex-start">
              <Flex w={250} align={"center"}>
                <Avatar
                  borderColor={"yellow.300"}
                  showBorder
                  size={"md"}
                  name={item.user.name}
                  src={item.user.avatar}
                />
                <Box ml="2">
                  <Flex justify="center" align="center">
                    <Text fontSize="12px" fontWeight="bold">
                      {item.user.name}
                    </Text>
                    <div>
                      <Badge
                        fontWeight="normal"
                        fontStyle="normal"
                        ml="3"
                        fontSize="6px"
                        bgColor={"yellow.300"}
                        color={"white"}
                      >
                        Follow
                      </Badge>
                    </div>
                  </Flex>

                  <Text fontSize="xs">{item.user.job_role}</Text>
                </Box>
              </Flex>

              <Flex justify="flex-end">
                <Stack direction="row" h="50px" w="2px" bgColor={"gray.400"}>
                  <Divider orientation="vertical" bgColor={"gray.400"} />
                </Stack>
                <Box ml={"2"} maxW="130px" w="130px" mr={"1"}>
                  <Text fontSize="8px" color={"gray.400"}>
                    THEME
                  </Text>
                  <Text fontSize="10px" fontWeight="bold" flexWrap={"wrap"}>
                    {item?.themes && item.themes.join(", ")}
                  </Text>
                </Box>
                <Stack direction="row" h="50px" w="2px" bgColor={"gray.400"}>
                  <Divider orientation="vertical" bgColor={"gray.400"} />
                </Stack>
                <Box maxW="md" ml={"1"} w="46px">
                  <Text fontSize="8px" color={"gray.400"}>
                    RELEASE
                  </Text>
                  <Text fontSize="10px" fontWeight="bold" flexWrap={"nowrap"}>
                    {`${getMonth(item?.created_at)}/${getYear(
                      item?.created_at
                    )}`}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      ))}
      {isOpen && (
        <ModalArticleReading
          onClose={onClose}
          isOpen={isOpen}
          idArticle={idArticle}
        />
      )}
    </>
  );
}
