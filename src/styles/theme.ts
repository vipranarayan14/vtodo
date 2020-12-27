import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.100',
      },
    },
  },
  textStyles: {
    h1: {
      fontWeight: '500',
    },
  },
});

export default theme;
