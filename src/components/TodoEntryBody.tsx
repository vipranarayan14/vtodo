import React from 'react';

import { HStack, Textarea, IconButton } from '@chakra-ui/react';

import { AiOutlineSend } from 'react-icons/ai';

type Props = {
  todoText: string;
  setTodoText: ($todoText: string) => void;
  isAddButtonDisabled: boolean;
  onAdd: () => void;
};

export const TodoEntryBody: React.FC<Props> = ({
  todoText,
  setTodoText,
  isAddButtonDisabled,
  onAdd,
}) => (
  <>
    <HStack spacing="1" alignItems={{ base: 'center', lg: 'start' }}>
      <Textarea
        placeholder="Add a task..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
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
        onClick={onAdd}
        isDisabled={isAddButtonDisabled}
        size="lg"
        height="2.5rem"
        variant="transparent"
      />
    </HStack>
  </>
);
