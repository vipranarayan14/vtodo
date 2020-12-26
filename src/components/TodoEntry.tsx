import React, { useState } from 'react';

import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';

import { TodoTxt } from '../lib/todotxt';

import { TodoEntryForLargeScreen } from './TodoEntryForLargeScreen';
import { TodoEntryForSmallScreen } from './TodoEntryForSmallScreen';
import { TodoEntryFooter } from './TodoEntryFooter';
import { TodoEntryBody } from './TodoEntryBody';

type Props = {
  addTodo: (todoText: string) => void;
  collections: {
    contexts: string[];
    projects: string[];
  };
};

export const TodoEntry: React.FC<Props> = ({ addTodo, collections }) => {
  const todoTextInitialState = '';

  const [todoText, setTodoText] = useState(todoTextInitialState);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const isScreenSizeLarge = useBreakpointValue({ lg: true }); // breakpoint: lg

  const isTodoTextEmpty: boolean = !!TodoTxt.parseLine(todoText)?.textTokens()
    .length;

  const onAdd = () => {
    addTodo(todoText);
    onClose();
    setTodoText(todoTextInitialState);
  };

  const Body = (
    <TodoEntryBody
      todoText={todoText}
      setTodoText={($todoText: string) => setTodoText($todoText)}
      isAddButtonDisabled={!isTodoTextEmpty}
      onAdd={onAdd}
    />
  );
  const Footer = (
    <TodoEntryFooter
      todoText={todoText}
      setTodoText={($todoText: string) => setTodoText($todoText)}
      collections={collections}
      isDisabled={!isTodoTextEmpty}
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
