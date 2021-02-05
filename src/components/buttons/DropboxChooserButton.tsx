import React from 'react';
import { Button, Tooltip } from '@chakra-ui/react';

import { useDropboxChooser } from 'use-dropbox-chooser';

import dbxClient from '../../utils/dbx';

type Props = {
  apiKey: string;
  dbxAccessToken: string;
  callback: Function;
};

export const DropboxChooserButton: React.FC<Props> = ({
  apiKey: appKey,
  dbxAccessToken,
  callback,
}) => {
  const { open, isOpen } = useDropboxChooser({
    appKey,
    chooserOptions: { linkType: 'preview', extensions: ['.txt'] },

    onSelected: async (files) => {
      if (files.length) {
        const sharedFileLink = files[0].link;

        const [filePath, error] = await dbxClient.getFilePath(
          sharedFileLink,
          dbxAccessToken
        );
        if (error) return;

        callback(filePath);
      }
    },
  });

  return (
    <Tooltip hasArrow label="Choose file from Dropbox">
      <Button onClick={open} disabled={isOpen} colorScheme="green">
        Choose...
      </Button>
    </Tooltip>
  );
};
