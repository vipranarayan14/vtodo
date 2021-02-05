import React from 'react';

import { IconType } from 'react-icons';

import { useDisclosure } from '@chakra-ui/react';

import { CollectionsModal } from '../../overlays/modals/CollectionsModal';
import { TodoEntryFooterButton } from './TodoEntryFooterButton';

type Props = {
  variant: string;
  Icon: IconType;
  isDisabled: boolean;
  getCollections: () => string[];
  addCollection: (collection: string) => void;
};

export const CollectionsButton: React.FC<Props> = ({
  variant,
  Icon,
  isDisabled,
  getCollections,
  addCollection,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TodoEntryFooterButton
        label={`Add ${variant.toLowerCase()}`}
        icon={<Icon />}
        isDisabled={isDisabled}
        onClick={onOpen}
      />
      <CollectionsModal
        variant={variant}
        icon={Icon}
        isOpen={isOpen}
        onClose={onClose}
        getCollections={getCollections}
        addCollection={addCollection}
      />
    </>
  );
};
