import React from 'react';

import { useDisclosure, IconButton } from '@chakra-ui/react';

import { CollectionsModal } from './CollectionsModal';

type Props = {
  variant: string;
  icon: React.ReactElement;
  isDisabled: boolean;
  getCollections: () => string[];
  addCollection: (collection: string) => void;
};

export const CollectionsButton: React.FC<Props> = ({
  variant,
  icon,
  isDisabled,
  getCollections,
  addCollection,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label={`Select ${variant}`}
        icon={icon}
        isDisabled={isDisabled}
        onClick={onOpen}
        size="lg"
        variant="ghost"
        mr="1"
      />
      <CollectionsModal
        variant={variant}
        isOpen={isOpen}
        onClose={onClose}
        getCollections={getCollections}
        addCollection={addCollection}
      />
    </>
  );
};