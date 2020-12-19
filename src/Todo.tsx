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

type Props = {
  todo: {
    [key: string]: any;
  };
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const text: string = todo.textTokens().join(' ');
  const isComplete: boolean = todo.isComplete();
  const contexts: string[] = todo.contexts();
  const projects: string[] = todo.projects();
  const hasContexts: boolean = !!contexts.length;
  const hasProjects: boolean = !!projects.length;

  return (
    <Box padding="5" shadow="base" bg="white" rounded="md">
      <HStack spacing="3" align="start">
        <Checkbox size="lg" defaultIsChecked={isComplete}></Checkbox>
        <VStack align="start">
          <Box>{text}</Box>
          {(hasContexts || hasProjects) && (
            <HStack>
              {hasContexts &&
                contexts.map((context) => (
                  <Tag colorScheme="blue">
                    <TagLeftIcon as={AtSignIcon} boxSize="12px"></TagLeftIcon>
                    <TagLabel>{context.slice(1)}</TagLabel>
                  </Tag>
                ))}
              {hasProjects &&
                projects.map((project) => (
                  <Tag colorScheme="orange">
                    <TagLeftIcon as={AddIcon} boxSize="12px"></TagLeftIcon>
                    <TagLabel>{project.slice(1)}</TagLabel>
                  </Tag>
                ))}
            </HStack>
          )}
        </VStack>
      </HStack>
    </Box>
  );
};
