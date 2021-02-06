import React from 'react';

import { Box, Checkbox, HStack, Spacer, Text } from '@chakra-ui/react';

import { TodoTxt } from '../../lib/todotxt';

import { Collections } from './Collections';
import { TodoMenu } from '../overlays/menus/TodoMenu';

import { getPriorityColor } from '../../utils/getPriorityColor';

type Props = {
  todo: TodoTxt.Todo;
  onChange: () => void;
  deleteTodo: (todoId: string) => void;
};

export const Todo: React.FC<Props> = ({ todo, onChange, deleteTodo }) => {
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
      shadow="base"
      bg="white"
      rounded="md"
      borderLeft="5px solid"
      borderLeftColor={getPriorityColor(priority).light}
    >
      <HStack spacing="0" align="start">
        <Checkbox
          size="lg"
          pt="1.1rem" // manually align checkbox with (the first line of) the todo text
          px="4"
          defaultIsChecked={isComplete}
          onChange={handleCheck}
        />

        <Box py="4">
          <Text as="span" mr="1">
            {text}
          </Text>

          <Collections contexts={contexts} projects={projects} />
        </Box>

        <Spacer />

        <TodoMenu todoId={todo.id()} deleteTodo={deleteTodo} />
      </HStack>
    </Box>
  );
};
