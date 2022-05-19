import { useCallback, useMemo, useState } from 'react';

import { Box, Button, Flex, Image, Input } from '@chakra-ui/react';
import NextLink from 'next/link';

import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate';
import { withHistory } from 'slate-history';

import { Button as Btn, Icon, Toolbar } from '../../components/Articles/Editor';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

export default function Write() {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as ReactEditor)),
    []
  );

  return (
    <>
      <Flex as="header" height={120} w={'100%'} justify={'space-between'}>
        <Box marginTop={'32px'} ml={'183px'}>
          <Box w="10rem">
            <Image src="tog.svg" alt="tog design" />
          </Box>
        </Box>

        <Flex mr={'82px'} mt={'33px'}>
          <NextLink href="/dashboard" passHref>
            <Button colorScheme={'orange'} mr={'48px'}>
              Cancel
            </Button>
          </NextLink>
          <Button colorScheme={'purple'}>Publish</Button>
        </Flex>
      </Flex>

      <Flex
        justify={'space-between'}
        height={'100vh'}
        align={'center'}
        flexDirection={'column'}
      >
        <Flex flexDirection={'column'} justify={'center'} align={'center'}>
          <Box>
            <Input></Input>
            <Box>
              <Button>Teste</Button>
            </Box>
          </Box>

          <Box>
            <Slate
              editor={editor}
              value={value}
              onChange={(value) => {
                setValue(value);
              }}
            >
              <Toolbar>
                <MarkButton format="bold" icon="format_bold" />
                <MarkButton format="italic" icon="format_italic" />
                <MarkButton format="underline" icon="format_underlined" />
                <MarkButton format="code" icon="code" />
                <BlockButton format="heading-one" icon="looks_one" />
                <BlockButton format="heading-two" icon="looks_two" />
                <BlockButton format="block-quote" icon="format_quote" />
                <BlockButton
                  format="numbered-list"
                  icon="format_list_numbered"
                />
                <BlockButton
                  format="bulleted-list"
                  icon="format_list_bulleted"
                />
              </Toolbar>

              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="Enter some rich text…"
                spellCheck={true}
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
        </Flex>

        <Flex w={'545px'} h={'106px'} bgColor={'black'} as={'footer'}></Flex>
      </Flex>
    </>
  );
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  });

  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Btn
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Btn>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Btn
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Btn>
  );
};

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Tell your story … ' }],
  },
];
