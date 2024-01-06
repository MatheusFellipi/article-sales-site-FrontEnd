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

export const WriteComponents = () => {
  const route = useRouter();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [text, setText] = useState<Descendant[]>(initialValue);
  const [values, setValues] = useState({
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

  const check = () => {
    if (values.amount === 0) {
      toast("Amount not is zero");
      return;
    }
    if (values.themes.length === 0) {
      toast("Choose theme");
      return;
    }
    if (values.text.length === 0) {
      toast("article not null");
      return;
    }
    if (values.title.length === 0) {
      toast("title is not null");
      return;
    }
  };

  const handleSubmit = () => {
    check();
    setValues({
      ...values,
      text: text,
    });
    connection
      .PostData("article", values)
      .then((res) => {
        toast("created article");
        route.push("/dashboard/published");
      })
      .catch((res) => {
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

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "This is editable " }],
  },
];
