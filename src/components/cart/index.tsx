/* eslint-disable react/react-in-jsx-scope */
import { Box, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { Formatar } from "../../shared/utils/Formatar";
import { ResumedCart } from "./resumed";
import { TableCart } from "./tabela";
import { useCart } from "../../hook/useCart";
import { controllersSales } from "../../services/sales";

export const CartComponents = () => {
  const { cart, removeProduct, valueTotal, removeAllProduct } = useCart();

  const handleSubmit = () => {
    if (cart.length === 0) return;
    const idsProduct = cart.map((item) => item.id);
    controllersSales.Sales({ ids_product: idsProduct }).then(() => {
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
