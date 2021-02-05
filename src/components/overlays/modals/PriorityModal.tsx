import React from 'react';

import {
  Button,
  Grid,
  GridItem,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { getPriorityColor } from '../../../utils/getPriorityColor';
import { AiFillFlag, AiOutlineFlag } from 'react-icons/ai';

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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setPriority: (priority: string) => void;
};

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
        <ModalHeader shadow="md">
          <Icon as={AiOutlineFlag} /> Set Priority
        </ModalHeader>

        <ModalBody>
          <Grid templateColumns="repeat(4, 1fr)" gap={4} mt="2" mb="4">
            <GridItem colSpan={4}>
              <Button
                leftIcon={<AiOutlineFlag />}
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
                    leftIcon={
                      <Icon as={AiFillFlag} color={priorityColor.light} />
                    }
                    onClick={() => handleClick(priority.symbol)}
                    width="100%"
                    justifyContent="left"
                  >
                    {priority.symbol}

                    <Text
                      as="span"
                      fontWeight="normal"
                      fontSize="xs"
                      display="block"
                      ml="1"
                    >
                      {`(${priority.info})`}
                    </Text>
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
