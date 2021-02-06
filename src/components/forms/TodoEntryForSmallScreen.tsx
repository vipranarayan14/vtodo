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

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  Body: React.ReactElement;
  Footer: React.ReactElement;
};

export const TodoEntryForSmallScreen: React.FC<Props> = ({
  isOpen,
  onOpen,
  onClose,
  Body,
  Footer,
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
      zIndex={1} // to rise it above other btns
    ></IconButton>

    <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
      <DrawerOverlay />
      <DrawerContent borderTopRadius="10px">
        <DrawerBody p="1">{Body}</DrawerBody>
        <DrawerFooter
          borderTopWidth="1px"
          py="1"
          justifyContent="space-between"
        >
          {Footer}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </>
);
