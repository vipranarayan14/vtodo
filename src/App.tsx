import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import utils from './utils';
import theme from './theme';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
import { Settings } from './pages/Settings';

const API_KEY = 'crpg0cmpv6ddpt8';

export const App = () => {
  const dbxAccessToken: string = utils.getAccessToken();

  const config = utils.getConfig();

  return (
    <ChakraProvider theme={theme}>
      {(() => {
        if (!Boolean(dbxAccessToken)) return <Auth apiKey={API_KEY} />;

        if (!config || !config.todoFilePath)
          return <Settings apiKey={API_KEY} dbxAccessToken={dbxAccessToken} />;

        return <Home dbxAccessToken={dbxAccessToken} config={config} />;
      })()}
    </ChakraProvider>
  );
};
