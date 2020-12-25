import React from 'react';

import { HStack, Textarea, IconButton } from '@chakra-ui/react';

import { AiOutlineSend } from 'react-icons/ai';

type Props = {
  todoString: string;
  setTodoString: any;
  handleSendClick: any;
};

export const TodoEntryBody: React.FC<Props> = ({
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
