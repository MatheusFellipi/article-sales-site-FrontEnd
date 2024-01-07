import { Articles } from "../components/articles/articles";
import { Flex } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { controllersArticles } from "../services/articles";


export default function Home({ data }) {
  return (
    <Flex flexWrap={"wrap"}>
      <Articles article={data} />
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await controllersArticles.Get();
  return {
    props: {
      data,
    },
  };
};
