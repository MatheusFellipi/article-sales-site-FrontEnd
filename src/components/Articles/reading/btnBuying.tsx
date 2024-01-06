import { Text, Flex, Button } from "@chakra-ui/react";
import { useCart } from "../../../hook/useCart";
import { ArticlesType } from "../../../types/articles";

interface Props {
  article: ArticlesType;
}

export function BtnBuyingComponent({ article }: Readonly<Props>) {
  const { addProduct } = useCart();
  return (
    <Flex h="xs">
      <Flex
        mt={50}
        direction={"column"}
        alignItems={"start"}
        w="100%"
        alignContent={"start"}
      >
        <Text fontSize="16">
          To continue reading, you need to buy this article.
        </Text>
        <Text fontSize="16" mt="1">
          you can continue this reading for only {article?.amount} paid your on
          card
        </Text>
        <Flex w="100%" mt="10" justifyContent={"center"}>
          <Button
            mt="2"
            colorScheme="cyan"
            color={"white"}
            size="lg"
            onClick={() => addProduct(article)}
          >
            Buy item
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
