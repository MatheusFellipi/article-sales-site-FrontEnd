import isHotkey from "is-hotkey";
import { BiBold, BiCode, BiItalic, BiUnderline } from "react-icons/bi";
import { Box } from "@chakra-ui/react";
import { Editable, Slate } from "slate-react";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import { Toolbar } from "./general";
import {
  MdFormatListBulleted,
  MdFormatQuote,
  MdFormatListNumbered,
} from "react-icons/md";
import { BlockButton, MarkButton, toggleMark } from "./btn";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export const EditComponent = ({
  editor,
  value,
  setText,
  renderElement,
  renderLeaf,
}) => {
  return (
    <Box w="container.lg" ml="60">
      <Slate
        editor={editor}
        initialValue={value}
        onValueChange={(text) => {
          setText(text);
        }}
      >
        <Toolbar>
          <MarkButton format="bold" icon={<BiBold />} />
          <MarkButton format="italic" icon={<BiItalic />} />
          <MarkButton format="underline" icon={<BiUnderline />} />
          <MarkButton format="code" icon={<BiCode />} />
          <BlockButton format="heading-one" icon={<LuHeading1 />} />
          <BlockButton format="heading-two" icon={<LuHeading2 />} />
          <BlockButton format="block-quote" icon={<MdFormatQuote />} />
          <BlockButton format="numbered-list" icon={<MdFormatListNumbered />} />
          <BlockButton format="bulleted-list" icon={<MdFormatListBulleted />} />
        </Toolbar>

          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck
            autoFocus
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
      </Slate>
    </Box>
  );
};
