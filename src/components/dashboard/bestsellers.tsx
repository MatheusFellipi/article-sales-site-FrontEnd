import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { Formatar } from "../../shared/utils/Formatar";
import { TypeBestSellers } from "../../types/components/dashboard";

type Props = {
  sales: TypeBestSellers[];
};

export const BestsellersComponents = ({ sales }: Props) => {
  return (
    <Box
      bgColor={"white"}
      mt={"32px"}
      as={"section"}
      borderRadius={10}
      px={"16px"}
      py={"24px"}
    >
      <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
        Your bestsellers
      </Box>
      <Table variant="unstyled" colorScheme="blue" size="md">
        <Thead>
          <Tr>
            <Th align="left" fontSize="16px" fontWeight={500}>
              Article
            </Th>
            <Th fontWeight={500} align="left" fontSize="16px">
              Publisher
            </Th>
            <Th fontWeight={500} align="left" fontSize="16px">
              Sales
            </Th>
            <Th align="left" fontSize="16px" fontWeight={500}>
              Value
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {sales.map((item) => (
            <Tr key={item.id}>
              <Td maxW={"305px"}>{item?.title}</Td>
              <Td>Tog.design</Td>
              <Td>{item.totalBuys}</Td>
              <Td>{Formatar.Money(item?.totalAmount)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
