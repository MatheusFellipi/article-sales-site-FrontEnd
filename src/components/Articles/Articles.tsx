/* eslint-disable react/react-in-jsx-scope */
import { Box, Image, Text, Flex, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { ArticlesProps } from "../../types/articles";
import { ModalArticleReading } from "./reading";
import { FooterComponent } from "./footer";

export function Articles({ article }: Readonly<ArticlesProps>) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [idArticle, setIdArticle] = useState<string>("");
  const handleOpenModalClick = (id: string) => {
    setIdArticle(id);
    onOpen();
  };
  return (
    <>
      {article.map((item) => (
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          cursor={"pointer"}
          key={item.id}
          maxW="412px"
          w="412px"
          margin="5"
          borderWidth="1px"
          bg="white"
          borderRadius="lg"
          overflow="hidden"
          onClick={() => handleOpenModalClick(item.id)}
        >
          <Image
            h={"40"}
            objectFit="cover"
            src={item.img_url ?? "not_img.jpeg"}
            alt={item.title}
          />
          <Box padding={"3"}>
            <Text
              fontSize="35px"
              fontWeight="500"
              maxH="80px"
              overflow={"hidden"}
            >
              {item.title}
            </Text>
            <FooterComponent article={item} />
          </Box>
        </Flex>
      ))}
      {isOpen && (
        <ModalArticleReading
          onClose={onClose}
          isOpen={isOpen}
          idArticle={idArticle}
        />
      )}
    </>
  );
}
