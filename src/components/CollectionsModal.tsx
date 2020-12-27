import React, { useState } from 'react';

import {
  Button,
  HStack,
  IconButton,
  Input,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

type Props = {
  variant: string;
  isOpen: boolean;
  onClose: () => void;
  getCollections: () => string[];
  addCollection: (collection: string) => void;
};

export const CollectionsModal: React.FC<Props> = ({
  variant,
  isOpen,
  onClose,
  getCollections,
  addCollection,
}) => {
  const [newCollection, setNewCollection] = useState('');

  const handleClick = (collection: string) => {
    addCollection(collection);
    onClose();
    setNewCollection('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent m="2">
        <ModalHeader shadow="md">Select a {variant.toLowerCase()}</ModalHeader>

        <ModalBody>
          <List>
            {getCollections().map((collection) => (
              <ListItem my="1" key={collection}>
                <Button
                  onClick={() => handleClick(collection)}
                  variant="ghost"
                  width="100%"
                >
                  {collection}
                </Button>
              </ListItem>
            ))}
          </List>

          <HStack my="3">
            <Input
              placeholder={`Create a new ${variant.toLowerCase()}...`}
              value={newCollection}
              onChange={(e) => setNewCollection(e.target.value)}
            />
            <IconButton
              aria-label="Create"
              icon={<AddIcon />}
              onClick={() => handleClick(newCollection)}
            />
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
