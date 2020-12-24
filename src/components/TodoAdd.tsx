import React, { useState } from 'react';

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  HStack,
  IconButton,
  Spacer,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';

import {
  AiOutlineSend,
  AiOutlineFlag,
  AiOutlineTag,
  AiOutlineClockCircle,
  AiOutlineCalendar,
} from 'react-icons/ai';

import { FiAtSign } from 'react-icons/fi';
import { AddIcon } from '@chakra-ui/icons';

type Props = {
  addTodo: (todoString: string) => void;
};

export const TodoAdd: React.FC<Props> = ({ addTodo }) => {
  const todoStringInitialState = ' +Inbox';

  const [todoString, setTodoString] = useState(todoStringInitialState);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialFocus = React.useRef(null);
  const finalFocus = React.useRef(null);

  const handleSendClick = () => {
    addTodo(todoString);
    onClose();
    setTodoString(todoStringInitialState);
  };

  return (
    <>
      <IconButton
        ref={finalFocus}
        aria-label="Add todo"
        icon={<AddIcon />}
        onClick={onOpen}
        colorScheme="green"
        size="lg"
        shadow="xl"
        position="fixed"
        bottom="30px"
        right="20px"
        isRound
      ></IconButton>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocus}
        finalFocusRef={finalFocus}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent borderTopRadius="10px">
          <DrawerBody p="1">
            <HStack spacing="1">
              <Textarea
                ref={initialFocus}
                defaultValue={todoString}
                onChange={(e) => setTodoString(e.target.value)}
                resize="none"
                fontWeight="500"
                px="8px"
                placeholder="Add a task..."
              />
              <IconButton
                aria-label="Add new todo"
                icon={<AiOutlineSend />}
                size="lg"
                variant="transparent"
                onClick={handleSendClick}
              />
            </HStack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px" py="1" justifyContent="start">
            <IconButton
              aria-label="Add priority"
              icon={<AiOutlineFlag />}
              size="lg"
              variant="transparent"
            />

            <Spacer />

            <IconButton
              aria-label="Add project"
              icon={<AiOutlineTag />}
              size="lg"
              variant="transparent"
            />

            <Spacer />

            <IconButton
              aria-label="Add context"
              icon={<FiAtSign />}
              variant="transparent"
            />
            <Spacer />

            <IconButton
              aria-label="Add due date"
              icon={<AiOutlineClockCircle />}
              size="lg"
              variant="transparent"
            />

            <Spacer />

            <IconButton
              aria-label="Add threshold date"
              icon={<AiOutlineCalendar />}
              size="lg"
              variant="transparent"
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
