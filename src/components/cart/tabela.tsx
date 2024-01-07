import { DeleteIcon } from "@chakra-ui/icons";
import { Table, Thead, Tbody, Button, Tr, Th, Td } from "@chakra-ui/react";
import { ArticlesType } from "../../types/articles";
import { Formatar } from "../../shared/utils/Formatar";

interface Props {
  itens: ArticlesType[];
  remover: Function;
}

export const TableCart = ({ itens, remover }: Props) => (
  <Table size="lg" w="100%" variant="simple">
    <Thead>
      <Tr>
        <Th
          align="left"
          fontFamily="Montserrat"
          fontSize="14px"
          fontWeight={"bold"}
          pb="0"
          pl="5"
          pr="5"
          pt="5"
        >
          Article
        </Th>
        <Th
          align="left"
          fontFamily="Montserrat"
          fontSize="14px"
          fontWeight={"bold"}
          pb="0"
          pl="5"
          pr="5"
          pt="5"
        >
          Author
        </Th>
        <Th
          fontFamily="Montserrat"
          fontSize="14px"
          fontWeight={"bold"}
          align="left"
          pb="0"
          pl="5"
          pr="5"
          pt="5"
        >
          Publisher
        </Th>
        <Th
          align="left"
          fontFamily="Montserrat"
          fontSize="14px"
          fontWeight={"bold"}
          pb="0"
          pl="5"
          pr="5"
          pt="5"
        >
          Value
        </Th>
        <Th></Th>
      </Tr>
    </Thead>
    <Tbody fontFamily="Montserrat" fontSize={"14pxp"}>
      {itens.map((item) => (
        <Tr key={item.id}>
          <Td pb="0" pl="5" pr="5" pt="0" maxW="200px">
            {item.title}
          </Td>
          <Td pb="0" pl="5" pr="5" pt="0" fontFamily="Montserrat">
            {item.user.name}
          </Td>
          <Td pb="2" pl="5" pr="5" pt="0" fontFamily="Montserrat">
            <p>Tog.design</p>
          </Td>
          <Td pb="0" pl="5" pr="5" pt="0" fontFamily="Montserrat">
            {Formatar.Money(item.amount)}
          </Td>
          <Td>
            <Button
              onClick={() => remover(item)}
              colorScheme="gray"
              variant="ghost"
            >
              <DeleteIcon />
            </Button>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
);
