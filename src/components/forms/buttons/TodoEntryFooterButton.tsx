import React from 'react';

import { IconButton, Tooltip } from '@chakra-ui/react';

type Props = {
  label: string;
  icon: React.ReactElement;
  isDisabled: boolean;
  onClick: () => void;
};

export const TodoEntryFooterButton: React.FC<Props> = ({ label, ...props }) => (
  <Tooltip label={label} hasArrow>
    <IconButton
      {...props}
      aria-label={label}
      size="lg"
      variant="ghost"
      mx="1"
    />
  </Tooltip>
);
