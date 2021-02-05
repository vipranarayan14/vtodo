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
      aria-label="Add todo"
      icon={<AiOutlineSend />}
      isDisabled
      size="lg"
      fontSize="1.5rem"
      height="2.5rem"
      variant="transparent"
    />
  </HStack>
);
