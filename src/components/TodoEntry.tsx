import React, { useState } from 'react';

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Input,
  Spacer,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

import { AiOutlineSend } from 'react-icons/ai';

import { AddIcon } from '@chakra-ui/icons';

import { TodoEntryBody } from './TodoEntryBody';
import { TodoEntryFooter } from './TodoEntryFooter';

type Props = {
  addTodo: (todoString: string) => void;
};

export const TodoEntry: React.FC<Props> = ({ addTodo }) => {
  const todoStringInitialState = '';

  const [todoString, setTodoString] = useState(todoStringInitialState);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isScreenSizeLarge = useBreakpointValue({ lg: true }); // breakpoint: lg

  const handleSendClick = () => {
    addTodo(todoString);
    onClose();
    setTodoString(todoStringInitialState);
  };

  if (isScreenSizeLarge) {
    return (
      <Box bg="white" borderRadius="10px" p="1" shadow="md" mt="2" mb="5">
        {!isOpen ? (
          <HStack spacing="1">
            <Input
              onFocus={onOpen}
              placeholder="Add a task..."
              bg="white"
              fontWeight="500"
              border="none"
              focusBorderColor="none"
              _placeholder={{ opacity: 1 }}
            />
            <IconButton
              aria-label="Add new todo"
              icon={<AiOutlineSend />}
              size="lg"
              height="2.5rem"
              variant="transparent"
              isDisabled
            />
          </HStack>
        ) : (
          <>
            <Box>
              <TodoEntryBody
                todoString={todoString}
                setTodoString={setTodoString}
                handleSendClick={handleSendClick}
              />
            </Box>
            <Flex borderTopWidth="1px" mt="1" py="1" justifyContent="start">
              <TodoEntryFooter />
              <Spacer />
              <Button onClick={onClose} size="lg">
                Close
              </Button>
            </Flex>
          </>
        )}
      </Box>
    );
  }

  return (
    <>
      <IconButton
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

      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent borderTopRadius="10px">
          <DrawerBody p="1">
            <TodoEntryBody
              todoString={todoString}
              setTodoString={setTodoString}
              handleSendClick={handleSendClick}
            />
          </DrawerBody>
          <DrawerFooter
            borderTopWidth="1px"
            py="1"
            justifyContent="space-between"
          >
            <TodoEntryFooter />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
