import { BiBook, BiEdit, BiLineChart } from "react-icons/bi";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { BestsellersComponents } from "./bestsellers";
import { CardDashInfoComponent } from "./cardInfo";
import { DashboardType } from "../../types/components/dashboard";
import { ChartsLineComponent } from "./chart";

type Props = {
  data: DashboardType;
};

export const DashboardComponent = ({ data }: Props) => {
  return (
    <Flex as="main" flexDir={{ base: "column", xl: "row" }} justifyContent={"space-around"}>
      <Box mb={"32px"}>
        <Box
          mb={"32px"}
          bgColor={"white"}
          w={900}
          p={4}
          borderRadius={10}
          as={"section"}
        >
          <ChartsLineComponent data={data.options} />
        </Box>
        <BestsellersComponents sales={data?.bestSales || []} />
      </Box>
      <CardDashInfoComponent
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
