import { Formatar } from "../../utils/Formatar";
import { Box, Flex, Text, Button, Divider, Stack } from "@chakra-ui/react";

interface Props {
  valueTotal: number;
  handleBuying?: VoidFunction;
}

export const ResumedCart = ({ valueTotal, handleBuying }: Props) => (
  <Flex
    flexDir="column"
    maxW={400}
    w="400px"
    bgColor="gray.200"
    padding={10}
    h="100%"
  >
    <Box width="100%" mt="5rem" mb="5rem">
      <Text fontSize="24px"> Resume</Text>
    </Box>
    {/* <MFInput
    name="Discont coupon"
    size="sm"
    w="270px"
    h="40px"
    borderColor="black"
  /> */}
    <Flex mt={5} ml={10} w="75%" justify={"space-between"} as="h4">
      <Text mr={5} fontSize="sm" fontFamily="Montserrat" fontWeight={500}>
        Subtotal
      </Text>
      <Text fontSize="sm" fontFamily="Montserrat" fontWeight={400}>
        {Formatar.Money(valueTotal)}
      </Text>
    </Flex>
    {/* <Flex mt={5} mb={2} ml={10} w="75%" justify={"space-between"} as="h4">
    <Text mr={5} fontSize="sm" fontFamily="Montserrat" fontWeight={500}>
      Discount
    </Text>
    <Text fontSize="sm" fontFamily="Montserrat" fontWeight={400}>
      R$ 2,00
    </Text>
  </Flex> */}
    <Stack bgColor={"gray.700"}>
      <Divider orientation="horizontal" bgColor={"gray.700"} />
    </Stack>
    <Flex mt={5} ml={10} w="75%" justify={"space-between"} as="h4">
      <Text mr={5} fontSize="sm" fontFamily="Montserrat" fontWeight={500}>
        Total
      </Text>
      <Text fontSize="md" fontFamily="Montserrat" fontWeight={400}>
        {Formatar.Money(valueTotal)}
      </Text>
    </Flex>
    <Flex mt={20} flexDirection={"column"}>
      <Stack spacing={8}>
        <Button
          colorScheme="black"
          variant="outline"
          fontFamily="Montserrat"
          borderRadius="20rem"
          fontSize="xs"
          fontWeight={400}
          onClick={handleBuying}
          _hover={{
            bgColor: "gray.300",
          }}
        >
          KEEP BUYING
        </Button>
      </Stack>
    </Flex>
  </Flex>
);
