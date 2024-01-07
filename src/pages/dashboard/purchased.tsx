/* eslint-disable react/react-in-jsx-scope */
import { Articles } from "../../components/articles/articles";
import { BiBook, BiEdit, BiLineChart } from "react-icons/bi";
import { CardDashInfoComponent } from "../../components/dashboard/cardInfo";
import { controllersArticles } from "../../services/dashboard";
import { Flex } from "@chakra-ui/react";
import { PurchasedType } from "../../types/components/purchased";
import { useEffect, useState } from "react";

export default function Purchased() {
  const [data, setData] = useState<PurchasedType>();

  const published = () => {
    controllersArticles.Purchased().then((res) => {
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
      <Flex flexWrap={"wrap"} pl="15rem" pb="1rem" w="80%">
        {data?.purchased && <Articles article={data.purchased} />}
      </Flex>
      <CardDashInfoComponent
        marginRight={"20px"}
        inf={data?.themes ?? []}
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
