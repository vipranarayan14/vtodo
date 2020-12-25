import React from 'react';

import { useBreakpointValue, useDisclosure } from '@chakra-ui/react';

import { TodoEntryForLargeScreen } from './TodoEntryForLargeScreen';
import { TodoEntryForSmallScreen } from './TodoEntryForSmallScreen';

type Props = {
  addTodo: (todoString: string) => void;
};

export const TodoEntry: React.FC<Props> = ({ addTodo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isScreenSizeLarge = useBreakpointValue({ lg: true }); // breakpoint: lg

  const onEntry = (todoString: string) => {
    addTodo(todoString);
    onClose();
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
