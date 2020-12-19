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
  text: string;
  contexts: string[];
  projects: string[];
};

export const Todo: React.FC<Props> = ({ text, contexts, projects }) => {
  const hasContexts = !!contexts.length;
  const hasProjects = !!projects.length;

  return (
    <Box padding="5" shadow="base" bg="white" rounded="md">
      <HStack spacing="3">
        <Checkbox size="lg"></Checkbox>
        <VStack align="start">
          <Box>{text}</Box>
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
        </VStack>
      </HStack>
    </Box>
  );
};
