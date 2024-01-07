/* eslint-disable react/react-in-jsx-scope */
import { BiBook, BiEdit, BiLineChart } from "react-icons/bi";
import { CardDashInfoComponent } from "../../components/dashboard/cardInfo";
import { controllersArticles } from "../../services/dashboard";
import { DeleteIcon } from "@chakra-ui/icons";
import { Formatar } from "../../shared/utils/Formatar";
import { PublishedType } from "../../types/components/dashboard";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Tr,
  Th,
  Td,
  Table,
  Thead,
  Tbody,
  Button,
  Text,
} from "@chakra-ui/react";

export default function Published() {
  const [data, setData] = useState<PublishedType>();

  const published = () => {
    controllersArticles.Published().then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    published();
  }, []);

  return (
    <Flex
      p="10"
      width={"100%"}
      alignItems={"flex-start"}
      justifyContent="flex-end"
    >
      {data?.listArticle.length > 0 ? (
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              <Th align="left" fontSize="16px" fontWeight={500}>
                Article
              </Th>
              <Th fontWeight={500} align="left" fontSize="16px">
                Publisher
              </Th>
              <Th fontWeight={500} align="left" fontSize="16px">
                Publication date
              </Th>
              <Th align="left" fontSize="16px" fontWeight={500}>
                Value
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.listArticle.map((item) => (
              <Tr key={item.id}>
                <Td maxW={"305px"}>{item.title}</Td>
                <Td>Tog.design</Td>
                <Td>{Formatar.Data(item.created_at)}</Td>
                <Td>{Formatar.Money(item.amount)}</Td>
                <Td>
                  <Box as="p" w={"100%"}>
                    <Button colorScheme="gray" variant="ghost">
                      <DeleteIcon />
                    </Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text w={"100%"} textAlign={"center"} fontSize={30}>
          you have no articles written
        </Text>
      )}
      <CardDashInfoComponent
        marginRight={"20px"}
        inf={data?.themes ?? []}
        links={[
          {
            href: "/dashboard",
            icon: BiLineChart,
          },
          {
            href: "/dashboard/purchased",
            icon: BiBook,
          },
        ]}
        title={{
          name: "Articles you wrote",
          icon: BiEdit,
        }}
      />
    </Flex>
  );
}
