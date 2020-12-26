import React from 'react';

import { useDisclosure, IconButton } from '@chakra-ui/react';

import { AiOutlineFlag } from 'react-icons/ai';

import { PriorityModal } from './PriorityModal';

type Props = {
  isDisabled: boolean;
  setPriority: (priority: string) => void;
};

export const PriorityButton: React.FC<Props> = ({
  isDisabled,
  setPriority,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="Add priority"
        icon={<AiOutlineFlag />}
        isDisabled={isDisabled}
        onClick={onOpen}
        size="lg"
        variant="ghost"
        mx="1"
      />
      <PriorityModal
        isOpen={isOpen}
        onClose={onClose}
        setPriority={setPriority}
      />
    </>
  );
};
