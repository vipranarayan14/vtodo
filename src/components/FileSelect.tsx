import React, { useState } from 'react';

import { Input, Stack } from '@chakra-ui/react';

import { DropboxChooserButton } from './buttons/DropboxChooserButton';

type Props = {
  apiKey: string;
  dbxAccessToken: string;
  callback: Function;
};

export const FileSelect: React.FC<Props> = ({ callback, ...props }) => {
  const [filePath, setFilePath] = useState<string>('');

  const handleChange = (e: any) => {
    const { value } = e.target;
    setFilePath(value);
    callback(value);
  };
  const handleChoose = ($filePath: string) => {
    setFilePath($filePath);
    callback($filePath);
  };

  return (
    <Stack direction={['column', 'row']} align="start">
      <Input
        bg="white"
        type="text"
        defaultValue={filePath}
        onChange={handleChange}
        placeholder="/path/to/file.txt"
      />
      <DropboxChooserButton {...props} callback={handleChoose} />
    </Stack>
  );
};
