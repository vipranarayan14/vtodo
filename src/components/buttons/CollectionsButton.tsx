import React from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { CollectionsModal } from '../CollectionsModal';
import { TodoEntryFooterButton } from './TodoEntryFooterButton';

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
      <TodoEntryFooterButton
        label={`Add ${variant.toLowerCase()}`}
        icon={icon}
        isDisabled={isDisabled}
        onClick={onOpen}
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
