import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Formatar } from "../../utils/Formatar";

export const BestsellersComponents = ({ sales }: any) => (
  <Box
    bgColor={"white"}
    w={900}
    h={335}
    mt={"32px"}
    as={"section"}
    borderRadius={10}
    px={"16px"}
    py={"24px"}
  >
    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
      Your bestsellers
    </Box>

    <TableContainer fontFamily="Montserrat" fontSize="16px" whiteSpace="normal">
      <Table variant="unstyled" size="lg">
        <Thead>
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
        </Thead>
        <Tbody>
          {sales.map((item) => (
            <Tr key={item.id}>
              <Td maxW={"305px"}>{item?.title}</Td>
              <Td>Tog.design</Td>
              <Td>2</Td>
              <Td>{Formatar.Money(item?.amount)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  </Box>
);
