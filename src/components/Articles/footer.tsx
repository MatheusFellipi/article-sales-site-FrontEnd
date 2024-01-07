/* eslint-disable react/react-in-jsx-scope */
import {
  Box,
  Text,
  Badge,
  Flex,
  Avatar,
  Divider,
  Stack,
} from "@chakra-ui/react";

import { getMonth, getYear } from "date-fns";
import { ArticlesType } from "../../types/articles";

interface Props {
  article: ArticlesType;
}

export function FooterComponent({ article }: Readonly<Props>) {
  return (
    <Flex mt="0.5rem" w={"full"} justifyContent="center">
      <Flex w={250} align={"center"}>
        <Avatar
          borderColor={"yellow.300"}
          showBorder
          size={"md"}
          name={article?.user?.name}
          src={article?.user?.avatar}
        />
        <Box ml="2">
          <Flex justify="center" align="center">
            <Text fontSize="12px" fontWeight="bold">
              {article?.user?.name}
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
          <Text fontSize="xs">{article?.user?.job_role}</Text>
        </Box>
      </Flex>
      <Stack direction="row" h="50px" w="2px" bgColor={"gray.400"} ml={"7"}>
        <Divider orientation="vertical" bgColor={"gray.400"} />
      </Stack>
      <Box ml={"2"} w="150px" mr={"1"}>
        <Text fontSize="8px" color={"gray.400"}>
          THEME
        </Text>
        <Text fontSize="10px" fontWeight="bold" flexWrap={"wrap"}>
          {article?.themes && article.themes.join(", ")}
        </Text>
      </Box>
      <Stack direction="row" h="50px" w="2px" bgColor={"gray.400"}>
        <Divider orientation="vertical" bgColor={"gray.400"} />
      </Stack>
      <Box maxW="md" ml={"1"}>
        <Text fontSize="8px" color={"gray.400"}>
          RELEASE
        </Text>
        <Text fontSize="10px" fontWeight="bold" flexWrap={"nowrap"}>
          {`${getMonth(article?.created_at)}/${getYear(article?.created_at)}`}
        </Text>
      </Box>
    </Flex>
  );
}
