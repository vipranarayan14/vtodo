import React from 'react';

import Calendar from 'react-calendar';

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import '../styles/Calendar.css';

type Props = {
  variant: string;
  isOpen: boolean;
  onClose: () => void;
  getDate: () => Date;
  setDate: (date: Date) => void;
};

export const CalendarModal: React.FC<Props> = ({
  variant,
  isOpen,
  onClose,
  getDate,
  setDate,
}) => {
  const handleClick = (newDate: Date | Date[]) => {
    const $newDate = Array.isArray(newDate) ? newDate[0] : newDate;

    setDate($newDate);

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent m="2">
        <ModalHeader shadow="md">Select {variant}</ModalHeader>

        <ModalBody p="3">
          <Calendar
            defaultValue={getDate()}
            onChange={handleClick}
            minDate={new Date()}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
