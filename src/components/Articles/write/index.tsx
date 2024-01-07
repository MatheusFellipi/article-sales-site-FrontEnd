/* eslint-disable react/react-in-jsx-scope */
import NextLink from "next/link";
import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react";
import { createEditor, Descendant } from "slate";
import { ReactEditor, withReact } from "slate-react";
import { useCallback, useMemo, useState } from "react";
import { withHistory } from "slate-history";
import { EditComponent } from "./edit";
import { LeafWriteComponent, WriteMenuComponent } from "./btn";
import { SubmitComponent } from "./submit";
import { connection } from "../../../services/connection";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { ValuesArticleSubmitType } from "../../../types/articles";
import { check } from "./validade";
import { controllersArticles } from "../../../services/articles";

export const WriteComponents = () => {
  const route = useRouter();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [text, setText] = useState<Descendant[]>([
    {
      children: [{ text: "Tell you story..." }],
    },
  ]);
  const [values, setValues] = useState<ValuesArticleSubmitType>({
    text: [],
    themes: [{ label: "", value: "" }],
    title: "",
    img_url: "",
    amount: 0,
  });

  const renderElement = useCallback(
    (props) => <WriteMenuComponent {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props) => <LeafWriteComponent {...props} />,
    []
  );
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as ReactEditor)),
    []
  );

  const handleSubmit = () => {
    if (check(values)) return;

    setValues({
      ...values,
      text: text,
    });

    controllersArticles
      .Post(values)
      .then((res) => {
        route.push("/dashboard/published");
        toast("created article");
      })
      .then((res) => {
        toast("not create article");
      });
  };

  return (
    <Box bgColor="gray.50">
      <Flex as="header" height={120} w={"100%"} justify={"flex-end"}>
        <Flex mr={"82px"} mt={"33px"}>
          <NextLink href="/dashboard" passHref>
            <Button colorScheme={"orange"} mr={"48px"}>
              Cancel
            </Button>
          </NextLink>
          <Button colorScheme={"purple"} onClick={() => onOpen()}>
            Publish
          </Button>
        </Flex>
      </Flex>
      <EditComponent
        editor={editor}
        value={text}
        setText={setText}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
      <SubmitComponent
        isOpen={isOpen}
        setValues={setValues}
        values={values}
        onClose={onClose}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
};
