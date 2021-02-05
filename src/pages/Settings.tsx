import React, { useState } from 'react';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

import { Header } from '../components/display/Header';
import { Main } from '../components/display/wrapper/Main';
import { FileSelect } from '../components/forms/FileSelect';

import utils from '../utils';

type Props = {
  apiKey: string;
  dbxAccessToken: string;
};

export const Settings: React.FC<Props> = ({ ...props }) => {
  const [todoFilePath, setTodoFilePath] = useState<string>('');
  const [doneFilePath, setDoneFilePath] = useState<string>('');

  const handleSave = () => {
    utils.setConfig({
      todoFilePath,
      doneFilePath,
    });
    window.location.reload();
  };
  return (
    <>
      <Header heading="Settings" />
      <Main>
        <VStack spacing="10" align="normal" mt="2">
          <Heading as="h2" fontSize="xl">
            File location
          </Heading>

          <Box>
            <Heading as="h3" fontSize="lg">
              Todo.txt file location
            </Heading>

            <Text>Choose in Dropbox or enter manually:</Text>

            <FileSelect callback={setTodoFilePath} {...props} />
          </Box>

          <Box>
            <Heading as="h3" fontSize="lg">
              Done.txt file location
            </Heading>

            <Text>Choose in Dropbox or enter manually:</Text>

            <FileSelect callback={setDoneFilePath} {...props} />
          </Box>

          <Box>
            <Heading as="h2" fontSize="xl">
              Storage
            </Heading>
            <Button
              onClick={() => utils.clearStorage()}
              colorScheme="green"
              my="4"
            >
              Clear Storage
            </Button>
          </Box>

          <Button onClick={handleSave} colorScheme="green">
            Save
          </Button>
        </VStack>
      </Main>
    </>
  );
};
