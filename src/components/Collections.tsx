import React from 'react';

import { AddIcon, AtSignIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/react';

import { Collection } from './Collection';

type CollectionsProps = {
  contexts: string[];
  projects: string[];
};

export const Collections: React.FC<CollectionsProps> = ({
  contexts,
  projects,
}) => {
  const hasContexts: boolean = !!contexts.length;
  const hasProjects: boolean = !!projects.length;

  if (!(hasContexts || hasProjects)) {
    return null;
  }

  return (
    <HStack>
      {hasContexts &&
        contexts.map((context, id) => (
          <Collection
            label={context}
            colorScheme="blue"
            icon={AtSignIcon}
            key={context + id}
          />
        ))}

      {hasProjects &&
        projects.map((project, id) => (
          <Collection
            label={project}
            colorScheme="orange"
            icon={AddIcon}
            key={project + id}
          />
        ))}
    </HStack>
  );
};
