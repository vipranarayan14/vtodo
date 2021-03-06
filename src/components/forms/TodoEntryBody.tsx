import React from 'react';

import { HStack, Textarea, IconButton, Tooltip } from '@chakra-ui/react';

import { AiOutlineSend } from 'react-icons/ai';

type Props = {
  todoText: string;
  setTodoText: ($todoText: string) => void;
  isAdding: boolean;
  isAddButtonDisabled: boolean;
  onAdd: () => void;
};

export const TodoEntryBody: React.FC<Props> = ({
  todoText,
  setTodoText,
  isAdding,
  isAddButtonDisabled,
  onAdd,
}) => {
  return (
    <>
      <HStack spacing="1" alignItems="center">
        <Textarea
          placeholder="Add a task..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          isDisabled={isAdding}
          autoFocus
          resize="none"
          fontWeight="500"
          border="none"
          lineHeight="inherit" // = 24px; to match with the placeholder input
          focusBorderColor="none"
          _placeholder={{ opacity: 1 }}
        />
        <Tooltip label="Add todo">
          <IconButton
            aria-label="Add todo"
            icon={<AiOutlineSend />}
            onClick={onAdd}
            isDisabled={isAddButtonDisabled}
            isLoading={isAdding}
            size="lg"
            fontSize="1.5rem"
            height="2.5rem"
            variant="transparent"
          />
        </Tooltip>
      </HStack>
    </>
  );
};
