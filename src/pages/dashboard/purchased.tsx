import { useState } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Flex } from "@chakra-ui/react";

import { BiBook, BiEdit, BiLineChart } from "react-icons/bi";

import { CardDashInfo } from "../../components/cardDashInfo/CardDashInfo";
import { Articles } from "../../components/articles/Articles";

type PurchasedType = {
  listItemsPuschasedArticles: [
    {
      id: string;
      title: string;
      user_id: string;
      amount: number;
      themes: string[];
      img_url: string;
      created_at: Date;
      update_at: Date;
      user: {
        id: string;
        name: string;
        job_role: string;
        avatar: string;
      };
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

export default function Purchased(purchased: PurchasedType) {
  const [data] = useState<PurchasedType>(purchased);
  return (
    <div>oio</div>
    // <Flex
    //   p="10"
    //   width={"100%"}
    //   alignItems={"flex-start"}
    //   justifyContent="flex-end"
    // >
    //   <Flex flexWrap={"wrap"} pl="15rem" pb="1rem" w="80%">
    //     <Articles article={data.listItemsPuschasedArticles} />
    //   </Flex>

    //   <CardDashInfo
    //     marginRight={"20px"}
    //     inf={data.themes}
    //     links={[
    //       {
    //         href: "/dashboard",
    //         icon: BiLineChart,
    //       },
    //       {
    //         href: "/dashboard/published",
    //         icon: BiEdit,
    //       },
    //     ]}
    //     title={{
    //       name: "Purchased articles",
    //       icon: BiBook,
    //     }}
    //   />
    // </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["togdesign:token"]: token } = parseCookies(ctx);

  const responce = await fetch("http://localhost:3333/dashboard/purchased", {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });

  const data = await responce.json();
  console.log(data);

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
      purchased: data,
    },
  };
};
