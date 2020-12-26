import React from 'react';

import { Box, Flex, Spacer, Button, Center } from '@chakra-ui/react';

import { TodoEntryPlaceholder } from './TodoEntryPlaceholder';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  Body: React.ReactElement;
  Footer: React.ReactElement;
};

export const TodoEntryForLargeScreen: React.FC<Props> = ({
  isOpen,
  onOpen,
  onClose,
  Body,
  Footer,
}) => (
  <Box bg="white" borderRadius="10px" p="1" shadow="md" mt="2" mb="5">
    {!isOpen ? (
      <TodoEntryPlaceholder onOpen={onOpen} />
    ) : (
      <>
        <Box>{Body}</Box>
        <Flex borderTopWidth="1px" mt="1" py="1" justifyContent="start">
          {Footer}
          <Spacer />
          <Center>
            <Button onClick={onClose} fontWeight="normal" mr="3">
              Close
            </Button>
          </Center>
        </Flex>
      </>
    )}
  </Box>
);
