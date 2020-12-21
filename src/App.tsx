import React, { useEffect, useState } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import utils from './utils';
import theme from './theme';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';

export const App = () => {
  const [dbxAccessToken, setDbxAccessToken] = useState<string>('');

  useEffect(() => {
    const $dbxAccessToken: string = utils.getAccessToken();

    if ($dbxAccessToken) {
      setDbxAccessToken($dbxAccessToken);
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {!Boolean(dbxAccessToken) ? (
        <Auth />
      ) : (
        <Home dbxAccessToken={dbxAccessToken} />
      )}
    </ChakraProvider>
  );
};
