import React from 'react';

import {
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

import { getPriorityColor } from '../utils/getPriorityColor';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setPriority: (priority: string) => void;
};

const quadrantPriorities = [
  {
    symbol: 'A',
    info: 'Important and urgent',
  },
  {
    symbol: 'B',
    info: 'Important and not urgent',
  },
  {
    symbol: 'C',
    info: 'Not important and urgent',
  },
  {
    symbol: 'D',
    info: 'Not important and not urgent',
  },
];

const alphabetsGtoZ: string[] = Array.from({ length: 20 }, (_, i) =>
  String.fromCharCode(71 + i)
);

export const PriorityModal: React.FC<Props> = ({
  isOpen,
  onClose,
  setPriority,
}) => {
  const handleClick = (priority: string) => {
    setPriority(priority);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent m="2">
        <ModalHeader shadow="md">Select Priority</ModalHeader>

        <ModalBody>
          <Grid templateColumns="repeat(4, 1fr)" gap={4} mt="2" mb="4">
            <GridItem colSpan={4}>
              <Button
                onClick={() => handleClick('')}
                width="100%"
                justifyContent="left"
                colorScheme="gray"
              >
                None
              </Button>
            </GridItem>

            {quadrantPriorities.map((priority) => {
              const priorityColor = getPriorityColor(priority.symbol);

              return (
                <GridItem colSpan={4} key={priority.symbol}>
                  <Button
                    onClick={() => handleClick(priority.symbol)}
                    width="100%"
                    justifyContent="left"
                    color="white"
                    bg={priorityColor.light}
                    _hover={{ bg: priorityColor.dark }}
                    _active={{ bg: priorityColor.darker }}
                  >
                    {`${priority.symbol} ${priority.info}`}
                  </Button>
                </GridItem>
              );
            })}

            <GridItem colSpan={2}>
              <Button onClick={() => handleClick('E')} width="100%">
                E
              </Button>
            </GridItem>
            <GridItem colSpan={2}>
              <Button onClick={() => handleClick('F')} width="100%">
                F
              </Button>
            </GridItem>

            {alphabetsGtoZ.map((alphabet: string) => (
              <Button onClick={() => handleClick(alphabet)} key={alphabet}>
                {alphabet}
              </Button>
            ))}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
