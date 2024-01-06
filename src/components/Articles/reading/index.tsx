import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Image,
  Text,
  Flex,
  SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

import { ArticlesType } from "../../../types/articles";
import { connection } from "../../../services/connection";
import { BtnBuyingComponent } from "./btnBuying";
import { FooterComponent } from "./footer";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  idArticle: string;
}

export function ModalArticleReading({
  onClose,
  isOpen,
  idArticle,
}: Readonly<Props>) {
  const [article, setArticle] = useState<ArticlesType>();
  const [text, setText] = useState<Descendant[]>();
  const editor = useMemo(() => withReact(createEditor() as ReactEditor), []);

  const details = (idArticle: string) => {
    connection
      .GetData<ArticlesType>(`http://localhost:3333/article/${idArticle}`)
      .then(({ data }) => {
        setArticle(data);
        const textFormattedJson = JSON.parse(data.text);
        setText(textFormattedJson);
      });
  };

  useEffect(() => {
    details(idArticle);
  }, [idArticle]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent={"center"}>
            <Box maxW={"500"} pos="relative">
              <Image src={article?.img_url} alt={article?.title} />
              <Box
                padding={"3"}
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
              >
                <Text fontSize="lg">{article?.title}</Text>
              </Box>
              {!text && (
                <SkeletonText
                  mt="4"
                  noOfLines={4}
                  spacing="4"
                  skeletonHeight="2"
                />
              )}
              {!!text && (
                <Slate
                  editor={editor}
                  initialValue={text}
                >
                  <Editable readOnly />
                </Slate>
              )}
              {!article?.userIsPurchased && (
                <BtnBuyingComponent article={article} />
              )}
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <FooterComponent article={article} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

