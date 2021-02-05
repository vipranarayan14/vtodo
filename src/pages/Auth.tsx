import React from 'react';

import { Button, Center, Image, Text, VStack } from '@chakra-ui/react';

import { DropboxAuth } from 'dropbox';

import { Header } from '../components/display/Header';
import { Main } from '../components/display/wrapper/Main';

import dropboxLogo from '../rsrcs/icons/dropbox.svg';

const redirectUri = window.location.origin + window.location.pathname;

type Props = {
  apiKey: string;
};

export const Auth: React.FC<Props> = ({ apiKey: clientId }) => {
  const dbxAuth = new DropboxAuth({ clientId });
  const authUrl = dbxAuth.getAuthenticationUrl(redirectUri);
  const goToAuthUrl = () => (window.location.href = authUrl);

  return (
    <>
      <Header heading="vTodo" />
      <Main>
        <Center>
          <VStack width={{ lg: '350px' }} spacing="5" m="5">
            <Image src={dropboxLogo} alt="dropbox logo" height="50px" my="5" />
            <Text my="5" align="center">
              Connect with your dropbox account to sync your tasks using
              'todo.txt' and 'done.txt' files.
            </Text>
            <Button onClick={goToAuthUrl} colorScheme="green">
              Connect
            </Button>
          </VStack>
        </Center>
      </Main>
    </>
  );
};
