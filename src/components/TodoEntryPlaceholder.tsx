import React from 'react';

import { HStack, Input, IconButton } from '@chakra-ui/react';

import { AiOutlineSend } from 'react-icons/ai';

type Props = {
  onOpen: () => void;
};

export const TodoEntryPlaceholder: React.FC<Props> = ({ onOpen }) => (
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
);
