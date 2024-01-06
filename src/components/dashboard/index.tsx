import { BiBook, BiEdit, BiLineChart } from "react-icons/bi";
import { Box, Flex } from "@chakra-ui/react";
import { BestsellersComponents } from "./bestsellers";
import { CardDashInfoComponent } from "./cardInfo";
import { DashboardType } from "../../types/components/dashboard";

type Props = {
  data: DashboardType;
};

export const DashboardComponent = ({ data }: Props) => {
  return (
    <Flex justify={"end"} p="10">
      <Flex
        flexDirection={"column"}
        borderRadius={10}
        justify={"start"}
        mr={"96px"}
        w={1080}
      >
        <Box
          mb={"32px"}
          bgColor={"white"}
          w={900}
          borderRadius={10}
          as={"section"}
        ></Box>
        <BestsellersComponents sales={data?.bestSales || []} />
      </Flex>
      <CardDashInfoComponent
        marginRight={"20px"}
        inf={data.totals}
        links={[
          {
            href: "/dashboard/purchased",
            icon: BiBook,
          },
          {
            href: "/dashboard/published",
            icon: BiEdit,
          },
        ]}
        title={{
          name: "dashboard",
          icon: BiLineChart,
        }}
      />
    </Flex>
  );
};
