import { BiBook, BiEdit, BiLineChart } from "react-icons/bi";
import { CardDashInfoComponent } from "../../components/dashboard/cardInfo";
import { DeleteIcon } from "@chakra-ui/icons";
import { Formatar } from "../../utils/Formatar";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
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
  TableContainer,
} from "@chakra-ui/react";

type PublishedType = {
  listArticle: [
    {
      id: string;
      title: string;
      user_id: string;
      amount: number;
      themes: string[];
      img_url: null;
      created_at: Date;
      update_at: Date;
    }
  ];
  count: number;
  themes: [
    {
      themes: string;
      total: number;
    }
  ];
};

type Props = {
  datas: PublishedType;
};

export default function Published({ datas }: Props) {
  console.log(datas);
  
  return (
    <Flex
      p="10"
      width={"100%"}
      alignItems={"flex-start"}
      justifyContent="flex-end"
    >
      <Box w="1080px" mr={"100px"}>
        <TableContainer
          fontFamily="Montserrat"
          fontSize="16px"
          whiteSpace="normal"
        >
          <Table variant="simple" size="lg">
            <Thead>
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
            </Thead>
            <Tbody>
              {datas.listArticle.map((item) => (
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
        </TableContainer>
      </Box>
      <CardDashInfoComponent
        marginRight={"20px"}
        inf={datas.themes}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["togdesign:token"]: token } = parseCookies(ctx);
  const response = await fetch("http://localhost:3333/dashboard/published", {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  const datas = await response.json();
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      datas,
    },
  };
};
