import React from 'react';

import { IconButton } from '@chakra-ui/react';

type Props = {
  label: string;
  icon: React.ReactElement;
  isDisabled: boolean;
  onClick: () => void;
};

export const TodoEntryFooterButton: React.FC<Props> = ({ label, ...props }) => (
  <IconButton {...props} aria-label={label} size="lg" variant="ghost" mx="1" />
);
