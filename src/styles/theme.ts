import { extendTheme } from '@chakra-ui/react';

const customFont = 'Roboto, "Segoe UI", Helvetica, Arial, sans-serif';

const theme = extendTheme({
  fonts: {
    body: customFont,
    heading: customFont,
  },
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
