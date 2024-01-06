import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { PurchasedType } from "../../types/components/purchased";
import { Flex } from "@chakra-ui/react";
import { Articles } from "../../components/articles/articles";
import { CardDashInfoComponent } from "../../components/dashboard/cardInfo";
import { BiBook, BiEdit, BiLineChart } from "react-icons/bi";

type Props = {
  data: PurchasedType;
};

export default function Purchased({ data }: Props) {
  return (
    <Flex
      p="10"
      width={"100%"}
      alignItems={"flex-start"}
      justifyContent="flex-end"
    >
      <Flex flexWrap={"wrap"} pl="15rem" pb="1rem" w="80%">
        {data?.purchased && <Articles article={data.purchased} />}
      </Flex>
      <CardDashInfoComponent
        marginRight={"20px"}
        inf={data.themes}
        links={[
          {
            href: "/dashboard",
            icon: BiLineChart,
          },
          {
            href: "/dashboard/published",
            icon: BiEdit,
          },
        ]}
        title={{
          name: "Purchased articles",
          icon: BiBook,
        }}
      />
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["togdesign:token"]: token } = parseCookies(ctx);

  const response = await fetch("http://localhost:3333/dashboard/purchased", {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });

  const data = await response.json();

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
      data,
    },
  };
};
