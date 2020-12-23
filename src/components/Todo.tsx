import React from 'react';

import {
  Box,
  Checkbox,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  VStack,
} from '@chakra-ui/react';
import { AddIcon, AtSignIcon } from '@chakra-ui/icons';

import { TodoTxt } from '../lib/todotxt';

type Props = {
  todo: TodoTxt.Todo;
};

/**
  Removes '@' and '+' prefixes
**/
const removePrefix = (tag: string): string => tag.slice(1);
const getPriorityColor = (priority: string): string => {
  const priorityColors: { [key: string]: string } = {
    A: 'red.500',
    B: 'orange.400',
    C: 'blue.500',
    D: 'green.500',
  };
  return priorityColors[priority] || 'white';
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const text: string = todo.textTokens().join(' ');
  const isComplete: boolean = todo.isComplete();
  const contexts: string[] = todo.contexts();
  const projects: string[] = todo.projects();
  const hasContexts: boolean = !!contexts.length;
  const hasProjects: boolean = !!projects.length;
  const priority = todo.priority();

  const handleCheck = (e: any) => {
    if (e.target.checked) {
      todo.completeTask();
    } else {
      todo.uncompleteTask();
    }
  };

  return (
    <Box
      padding="5"
      shadow="base"
      bg="white"
      rounded="md"
      borderLeftColor={getPriorityColor(priority)}
      borderLeftWidth="5px"
      borderLeftStyle="solid"
    >
      <HStack spacing="3" align="start">
        <Checkbox
          size="lg"
          defaultIsChecked={isComplete}
          mt="2.5px"
          onChange={handleCheck}
          isDisabled
        ></Checkbox>
        <VStack align="start">
          <Box>{text}</Box>
          {(hasContexts || hasProjects) && (
            <HStack>
              {hasContexts &&
                contexts.map((context, id) => (
                  <Tag colorScheme="blue" key={context + id}>
                    <TagLeftIcon as={AtSignIcon} boxSize="12px"></TagLeftIcon>
                    <TagLabel>{removePrefix(context)}</TagLabel>
                  </Tag>
                ))}
              {hasProjects &&
                projects.map((project, id) => (
                  <Tag colorScheme="orange" key={project + id}>
                    <TagLeftIcon as={AddIcon} boxSize="12px"></TagLeftIcon>
                    <TagLabel>{removePrefix(project)}</TagLabel>
                  </Tag>
                ))}
            </HStack>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};
