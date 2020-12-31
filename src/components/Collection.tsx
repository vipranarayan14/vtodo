import React from 'react';

import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';

type CollectionProps = {
  label: string;
  colorScheme: string;
  icon: any;
};

/**
 * Removes '@' and '+' prefixes
 **/
const removePrefix = (tag: string): string => tag.slice(1);

export const Collection: React.FC<CollectionProps> = ({
  label,
  colorScheme,
  icon,
}) => (
  <Tag colorScheme={colorScheme} mr="1" mb="1">
    <TagLeftIcon as={icon} boxSize="12px"></TagLeftIcon>
    <TagLabel>{removePrefix(label)}</TagLabel>
  </Tag>
);
