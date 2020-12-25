import React from 'react';

import { Box, Flex, Spacer, Button } from '@chakra-ui/react';

import { TodoEntryBody } from './TodoEntryBody';
import { TodoEntryFooter } from './TodoEntryFooter';
import { TodoEntryPlaceholder } from './TodoEntryPlaceholder';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onEntry: (todoString: string) => void;
};

export const TodoEntryForLargeScreen: React.FC<Props> = ({
  isOpen,
  onOpen,
  onClose,
  onEntry,
}) => (
  <Box bg="white" borderRadius="10px" p="1" shadow="md" mt="2" mb="5">
    {!isOpen ? (
      <TodoEntryPlaceholder onOpen={onOpen} />
    ) : (
      <>
        <Box>
          <TodoEntryBody onEntry={onEntry} />
        </Box>
        <Flex borderTopWidth="1px" mt="1" py="1" justifyContent="start">
          <TodoEntryFooter />
          <Spacer />
          <Button onClick={onClose} size="lg">
            Close
          </Button>
        </Flex>
      </>
    )}
  </Box>
);
