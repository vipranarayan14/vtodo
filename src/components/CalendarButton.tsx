import React from 'react';

import { useDisclosure, IconButton } from '@chakra-ui/react';

import { CalendarModal } from './CalendarModal';

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
      <IconButton
        aria-label={`Select ${variant}`}
        icon={icon}
        isDisabled={isDisabled}
        onClick={onOpen}
        size="lg"
        variant="ghost"
        mr="1"
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
