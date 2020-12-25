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
  Textarea,
  useBreakpointValue,
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

type BodyProps = {
  todoString: string;
  setTodoString: any;
  handleSendClick: any;
};

const Body: React.FC<BodyProps> = ({
  todoString,
  setTodoString,
  handleSendClick,
}) => (
  <>
    <HStack spacing="1" alignItems={{ base: 'center', lg: 'start' }}>
      <Textarea
        placeholder="Add a task..."
        defaultValue={todoString}
        onChange={(e) => setTodoString(e.target.value)}
        autoFocus
        resize="none"
        fontWeight="500"
        border="none"
        lineHeight="inherit" // = 24px; to match with the placeholder input
        focusBorderColor="none"
        _placeholder={{ opacity: 1 }}
      />
      <IconButton
        aria-label="Add new todo"
        icon={<AiOutlineSend />}
        size="lg"
        height="2.5rem"
        variant="transparent"
        onClick={handleSendClick}
      />
    </HStack>
  </>
);

const Footer: React.FC = () => (
  <>
    <IconButton
      aria-label="Add priority"
      icon={<AiOutlineFlag />}
      size="lg"
      variant="transparent"
    />
    {/* <Spacer /> */}
    <IconButton
      aria-label="Add project"
      icon={<AiOutlineTag />}
      size="lg"
      variant="transparent"
    />
    {/* <Spacer /> */}
    <IconButton
      aria-label="Add context"
      icon={<FiAtSign />}
      size="lg"
      variant="transparent"
    />
    {/* <Spacer /> */}
    <IconButton
      aria-label="Add due date"
      icon={<AiOutlineClockCircle />}
      size="lg"
      variant="transparent"
    />
    {/* <Spacer /> */}
    <IconButton
      aria-label="Add threshold date"
      icon={<AiOutlineCalendar />}
      size="lg"
      variant="transparent"
    />
  </>
);

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
              <Body
                todoString={todoString}
                setTodoString={setTodoString}
                handleSendClick={handleSendClick}
              />
            </Box>
            <Flex borderTopWidth="1px" mt="1" py="1" justifyContent="start">
              <Footer />
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
            <Body
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
            <Footer />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
