import React from 'react';

import Calendar from 'react-calendar';

import { IconType } from 'react-icons';

import {
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import '../../../styles/Calendar.css';

type Props = {
  variant: string;
  icon: IconType;
  isOpen: boolean;
  onClose: () => void;
  getDate: () => Date;
  setDate: (date: Date) => void;
};

export const CalendarModal: React.FC<Props> = ({
  variant,
  icon,
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
        <ModalHeader shadow="md">
          <Icon as={icon} /> Select {variant}
        </ModalHeader>

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
