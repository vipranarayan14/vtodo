import React from 'react';

import {
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { TodoEntryBody } from './TodoEntryBody';
import { TodoEntryFooter } from './TodoEntryFooter';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onEntry: (todoString: string) => void;
};

export const TodoEntryForSmallScreen: React.FC<Props> = ({
  isOpen,
  onOpen,
  onClose,
  onEntry,
}) => (
  <>
    <IconButton
      aria-label="Add todo"
      icon={<AddIcon />}
      onClick={onOpen}
      colorScheme="green"
      size="lg"
      shadow="xl"
      position="fixed"
      bottom="30px"
      right="20px"
      isRound
    ></IconButton>

    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent borderTopRadius="10px">
        <DrawerBody p="1">
          <TodoEntryBody onEntry={onEntry} />
        </DrawerBody>
        <DrawerFooter
          borderTopWidth="1px"
          py="1"
          justifyContent="space-between"
        >
          <TodoEntryFooter />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </>
);
