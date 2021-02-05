import React from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { CalendarModal } from '../../overlays/modals/CalendarModal';
import { TodoEntryFooterButton } from './TodoEntryFooterButton';

type Props = {
  variant: string;
  icon: React.ReactElement;
  isDisabled: boolean;
  getDate: () => Date;
  setDate: (date: Date) => void;
};

export const CalendarButton: React.FC<Props> = ({
  variant,
  icon,
  isDisabled,
  getDate,
  setDate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TodoEntryFooterButton
        label={`Select ${variant.toLowerCase()}`}
        icon={icon}
        isDisabled={isDisabled}
        onClick={onOpen}
      />
      <CalendarModal
        variant={variant}
        isOpen={isOpen}
        onClose={onClose}
        getDate={getDate}
        setDate={setDate}
      />
    </>
  );
};
