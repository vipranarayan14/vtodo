import React, { useState } from 'react';

import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';

import { TodoEntryForLargeScreen } from './TodoEntryForLargeScreen';
import { TodoEntryForSmallScreen } from './TodoEntryForSmallScreen';
import { TodoEntryFooter } from './TodoEntryFooter';
import { TodoEntryBody } from './TodoEntryBody';

type Props = {
  addTodo: (todoText: string) => void;
};

export const TodoEntry: React.FC<Props> = ({ addTodo }) => {
  const todoTextInitialState = '';

  const [todoText, setTodoText] = useState(todoTextInitialState);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isScreenSizeLarge = useBreakpointValue({ lg: true }); // breakpoint: lg

  const onAdd = () => {
    addTodo(todoText);
    onClose();
    setTodoText(todoTextInitialState);
  };

  const Body = (
    <TodoEntryBody
      todoText={todoText}
      setTodoText={($todoText: string) => setTodoText($todoText)}
      onAdd={onAdd}
    />
  );
  const Footer = (
    <TodoEntryFooter
      todoText={todoText}
      setTodoText={($todoText: string) => setTodoText($todoText)}
    />
  );

  if (isScreenSizeLarge) {
    return (
      <TodoEntryForLargeScreen
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        Body={Body}
        Footer={Footer}
      />
    );
  }

  return (
    <TodoEntryForSmallScreen
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      Body={Body}
      Footer={Footer}
    />
  );
};
