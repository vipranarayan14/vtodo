import React from 'react';

import { IconType } from 'react-icons';

import { useDisclosure } from '@chakra-ui/react';

import { CalendarModal } from '../../overlays/modals/CalendarModal';
import { TodoEntryFooterButton } from './TodoEntryFooterButton';

type Props = {
  variant: string;
  Icon: IconType;
  isDisabled: boolean;
  getDate: () => Date;
  setDate: (date: Date) => void;
};

export const CalendarButton: React.FC<Props> = ({
  variant,
  Icon,
  isDisabled,
  getDate,
  setDate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TodoEntryFooterButton
        label={`Select ${variant.toLowerCase()}`}
        icon={<Icon />}
        isDisabled={isDisabled}
        onClick={onOpen}
      />
      <CalendarModal
        icon={Icon}
        variant={variant}
        isOpen={isOpen}
        onClose={onClose}
        getDate={getDate}
        setDate={setDate}
      />
    </>
  );
};
