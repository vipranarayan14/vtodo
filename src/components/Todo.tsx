import React from 'react';

import { Box, Checkbox, HStack, VStack } from '@chakra-ui/react';

import { TodoTxt } from '../lib/todotxt';

import { Collections } from './Collections';

import { getPriorityColor } from '../utils/getPriorityColor';

type Props = {
  todo: TodoTxt.Todo;
  onChange: () => void;
};

export const Todo: React.FC<Props> = ({ todo, onChange }) => {
  const text: string = todo.textTokens().join(' ');
  const isComplete: boolean = todo.isComplete();
  const contexts: string[] = todo.contexts();
  const projects: string[] = todo.projects();

  const priority = todo.priority();

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      todo.completeTask();
    } else {
      todo.uncompleteTask();
    }
    onChange();
  };

  return (
    <Box
      padding="5"
      shadow="base"
      bg="white"
      rounded="md"
      borderLeft="5px solid"
      borderLeftColor={getPriorityColor(priority).light}
    >
      <HStack spacing="3" align="start">
        <Checkbox
          size="lg"
          mt="2.5px"
          defaultIsChecked={isComplete}
          onChange={handleCheck}
        ></Checkbox>
        <VStack align="start">
          <Box>{text}</Box>
          <Collections contexts={contexts} projects={projects} />
        </VStack>
      </HStack>
    </Box>
  );
};
