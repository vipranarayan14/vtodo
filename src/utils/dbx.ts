import { Dropbox } from 'dropbox';

type vtodoFile = {
  metadata: {
    rev: string;
    [key: string]: string;
  };
  contents: string;
};

// const accessToken = process.env.REACT_APP_DBX_ACCESS_TOKEN;
// create-react-app, by default, supports using custom environment variables through '.env' files.
// Refer: https://create-react-app.dev/docs/adding-custom-environment-variables/

const openFile = async (path: string, accessToken: string) => {
  const dbx = new Dropbox({ accessToken });

  try {
    const { result } = await dbx.filesDownload({ path });

    const { fileBlob, ...metadata } = result as any;

    const contents = await fileBlob?.text();

    const file: vtodoFile = { metadata, contents };

    return [file, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const updateFile = async (
  contents: string,
  file: vtodoFile,
  accessToken: string
) => {
  const dbx = new Dropbox({ accessToken });

  const { path_display: path } = file.metadata;

  const mode: any = {
    '.tag': 'update',
    update: file.metadata.rev,
  };

  try {
    const { result: metadata } = await dbx.filesUpload({
      path,
      mode,
      contents,
    });

    const savedFile = { metadata, contents };

    return [savedFile, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const getFilePath = async (sharedFileLink: string, accessToken: string) => {
  const dbx = new Dropbox({ accessToken });
  try {
    const fileMetadata = await dbx.sharingGetSharedLinkMetadata({
      url: sharedFileLink,
    });

    const filePath = fileMetadata?.result.path_lower;

    return [filePath, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const client = {
  openFile,
  updateFile,
  getFilePath,
};

export default client;
