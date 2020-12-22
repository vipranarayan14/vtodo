import React from 'react';

import { Button, Center } from '@chakra-ui/react';

import { DropboxAuth } from 'dropbox';

const API_KEY = 'crpg0cmpv6ddpt8';

const dbxAuth = new DropboxAuth({ clientId: API_KEY });

const redirectUri = window.location.origin + window.location.pathname;

const authUrl = dbxAuth.getAuthenticationUrl(redirectUri);

const goToAuthUrl = () => (window.location.href = authUrl);

export const Auth = () => {
  return (
    <Center mt="2">
      <Button onClick={goToAuthUrl} colorScheme="green">
        Connect Dropbox
      </Button>
    </Center>
  );
};
