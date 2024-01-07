import { FormEvent, SyntheticEvent, useState } from "react";
import { Flex, Button, Box, Image, Text, Stack } from "@chakra-ui/react";
import { useAuth } from "../hook/auth";
import { MFInput } from "../components/Form/MFInput";
import { controllersAuth } from "../services/auth";

export default function Login() {
  const { signIn } = useAuth();

  const initialValue = {
    email: "matheus.fellipi@hotmail.com",
    password: "1234578",
  };

  const [values, setValues] = useState(initialValue);

  function handleChanger(event: FormEvent<HTMLInputElement>) {
    const fieldName = event.currentTarget.getAttribute("name");
    const value = event.currentTarget.value;
    setValues({
      ...values,
      [fieldName]: value,
    });
  }
  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    controllersAuth.Login(values).then((res) => {
      signIn(res);
    });
  };

  return (
    <Flex flexDir="column" h="100vh" align="center" justify="center">
      <Box
        mt="5rem"
        w="10rem"
        display={{ lg: "block", md: "block", sm: "none" }}
      >
        <Image src="tog.svg" alt="tog design" />
      </Box>
      <Flex
        as="form"
        flexDir="column"
        align="center"
        justify="space-around"
        maxW={400}
        h="100%"
        method="post"
        onSubmit={handleSubmit}
      >
        <Box
          fontWeight="bold"
          as="h1"
          fontSize="25px"
          color="black"
          w="100%"
          mt="9"
        >
          <Text textShadow="1px 1px #ffff">Sign in</Text>
        </Box>
        <Box>
          <Stack spacing={"10"}>
            <MFInput
              placeholder="E-mail"
              id="email"
              name="email"
              size="sm"
              w="400px"
              h="40px"
              value={values.email}
              type="email"
              focusBorderColor="black"
              autoComplete="username"
              onChange={handleChanger}
              isRequired
            />
            <MFInput
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              value={values.password}
              size="sm"
              w="400px"
              h="40px"
              focusBorderColor="black"
              onChange={handleChanger}
              autoComplete="current-password"
              isRequired
            />
          </Stack>
        </Box>
        <Button
          w="200px"
          h="40px"
          borderRadius="20rem"
          type="submit"
          onClick={handleSubmit}
          mb="5rem"
          bgColor={"blue.600"}
          color="white"
          _hover={{
            bgColor: "blue.700",
          }}
        >
          Sign in
        </Button>
      </Flex>
    </Flex>
  );
}
