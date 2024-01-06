import {
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Flex,
  Button,
  Box,
} from "@chakra-ui/react";
import { StatefulMultiSelect } from "./muilselect";
import { SetStateAction, useEffect, useState } from "react";
import { connection } from "../../../services/connection";
import { MFInput } from "../../Form/MFInput";

interface Props {
  onClose: () => void;
  isOpen: boolean;
  handleSubmit: VoidFunction;
  values: any;
  setValues: SetStateAction<any>;
}

export function SubmitComponent({
  onClose,
  isOpen,
  handleSubmit,
  setValues,
  values,
}: Readonly<Props>) {
  const [options, setOption] = useState();

  const optionsThemes = () => {
    connection
      .GetData("themes")
      .then(({ data }) => {
        setOption(
          data.map((item) => ({
            label: item.theme,
            value: item.theme.toLowerCase(),
          }))
        );
      })
      .catch((res) => {});
  };

  useEffect(() => {
    optionsThemes();
  }, []);

  return (
    <Modal isOpen={isOpen} size="5xl" onClose={() => {}}>
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Box mt="10">
            <MFInput
              onChange={(text) => {
                setValues({
                  ...values,
                  title: text.target.value,
                });
              }}
              value={values.title}
              name="title"
              label="Title"
              placeholder="title"
            />
            <MFInput
              type="number"
              onChange={(text) => {
                setValues({
                  ...values,
                  amount: parseInt(text.target.value),
                });
              }}
              value={values.amount}
              name="amount"
              label="Amount"
              placeholder="Amount"
            />
            <MFInput
              onChange={(text) => {
                setValues({
                  ...values,
                  img_url: text.target.value,
                });
              }}
              value={values.img_url}
              name="img_url"
              label="imagem url"
              placeholder="imagem url"
              mb={"1"}
            />
            <StatefulMultiSelect
              options={options}
              onCallBack={(value: { label: string; value: string }[]) => {
                setValues({
                  ...values,
                  themes: value.map((item) => item.value),
                });
              }}
              label="Choose theme"
              create
            />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Flex mr={"82px"} mt={"33px"}>
            <Button colorScheme={"orange"} mr={"48px"} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme={"purple"} onClick={handleSubmit}>
              Publish
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
