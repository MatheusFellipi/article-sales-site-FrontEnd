import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { connection } from "../../services/connection";
import { Formatar } from "../../utils/Formatar";
import { ResumedCart } from "./resumed";
import { TableCart } from "./tabela";
import { useCart } from "../../hook/useCart";

export const CartComponents = () => {
  const { cart, removeProduct, valueTotal, removeAllProduct } = useCart();

  const handleSubmit = () => {
    if (cart.length === 0) return;
    const ids_product = cart.map((item) => item.id);
    connection
      .PostData<any, any>("sale", {
        ids_product,
      })
      .then(() => {
        removeAllProduct();
      });
  };

  return (
    <Flex h="85vh" justify="space-between" align={"flex-start"}>
      <Flex
        w={"1200px"}
        mt={"52px"}
        ml={"128px"}
        flexDir="column"
        justify="center"
        align="center"
      >
        <Text
          fontSize="md"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          fontFamily="Montserrat"
          size={"24px"}
        >
          Your cart
        </Text>
        <Box w="100%" mt="10">
          <TableCart itens={cart} remover={removeProduct} />
          <Stack bgColor={"gray.700"}>
            <Divider orientation="horizontal" bgColor={"gray.700"} />
          </Stack>
          <Flex mt={5} ml={10} w="75%" justify={"end"} as="h4">
            <Text mr={5} fontSize="xs" fontFamily="Montserrat" fontWeight={500}>
              Subtotal
            </Text>
            <Text fontSize="xs" fontFamily="Montserrat" fontWeight={400}>
              {Formatar.Money(valueTotal)}
            </Text>
          </Flex>
        </Box>
      </Flex>

      <ResumedCart valueTotal={valueTotal} handleBuying={handleSubmit} />
    </Flex>
  );
};
