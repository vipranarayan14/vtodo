import React, { useState } from 'react';

import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';

import { TodoEntryForLargeScreen } from './TodoEntryForLargeScreen';
import { TodoEntryForSmallScreen } from './TodoEntryForSmallScreen';

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

  if (isScreenSizeLarge) {
    return (
      <TodoEntryForLargeScreen
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        onEntry={onEntry}
      />
    );
  }

  return (
    <TodoEntryForSmallScreen
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onEntry={onEntry}
    />
  );
};
