import React from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { AiOutlineFlag } from 'react-icons/ai';

import { PriorityModal } from '../PriorityModal';
import { TodoEntryFooterButton } from './TodoEntryFooterButton';

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
      <TodoEntryFooterButton
        label="Set priority"
        icon={<AiOutlineFlag />}
        isDisabled={isDisabled}
        onClick={onOpen}
      />
      <PriorityModal
        isOpen={isOpen}
        onClose={onClose}
        setPriority={setPriority}
      />
    </>
  );
};
