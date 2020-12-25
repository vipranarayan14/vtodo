import React from 'react';

import { IconButton } from '@chakra-ui/react';

import {
  AiOutlineFlag,
  AiOutlineTag,
  AiOutlineClockCircle,
  AiOutlineCalendar,
} from 'react-icons/ai';
import { FiAtSign } from 'react-icons/fi';

export const TodoEntryFooter: React.FC = () => (
  <>
    <IconButton
      aria-label="Add priority"
      icon={<AiOutlineFlag />}
      size="lg"
      variant="transparent"
    />

    <IconButton
      aria-label="Add project"
      icon={<AiOutlineTag />}
      size="lg"
      variant="transparent"
    />

    <IconButton
      aria-label="Add context"
      icon={<FiAtSign />}
      size="lg"
      variant="transparent"
    />

    <IconButton
      aria-label="Add due date"
      icon={<AiOutlineClockCircle />}
      size="lg"
      variant="transparent"
    />

    <IconButton
      aria-label="Add threshold date"
      icon={<AiOutlineCalendar />}
      size="lg"
      variant="transparent"
    />
  </>
);
