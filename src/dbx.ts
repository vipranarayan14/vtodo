import { Dropbox } from 'dropbox';

type vtodoFile = {
  metadata: {
    rev: string;
    [key: string]: string;
  };
  contents: string;
};

const accessToken = process.env.REACT_APP_DBX_ACCESS_TOKEN;
// create-react-app, by default, supports using custom environment variables through '.env' files.
// Refer: https://create-react-app.dev/docs/adding-custom-environment-variables/

const dbx = new Dropbox({ accessToken });

const openFile = async (path: string) => {
  const { result } = await dbx.filesDownload({ path });

  const { fileBlob, ...metadata } = result as any;

  const contents = await fileBlob?.text();

  const file: vtodoFile = { metadata, contents };

  return file;
};

const updateFile = async (contents: string, file: vtodoFile) => {
  const { path_display: path } = file.metadata;

  const mode: any = {
    '.tag': 'update',
    update: file.metadata.rev,
  };

  const { result: metadata } = await dbx.filesUpload({ path, mode, contents });

  const savedFile = { metadata, contents };

  return savedFile;
};

const client = {
  openFile,
  updateFile,
};

export default client;
