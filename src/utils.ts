import queryString from 'query-string';

const SESSION_KEY = 'vtodo-dropbox-session';

const getAccessTokenFromUrlHash = (): string => {
  const { hash } = window.location;

  if (!hash) return '';

  const parsedHash = queryString.parse(hash);

  // `queryString.parse()` will always return an object
  if (!Object.values(parsedHash).length) return '';

  const accessToken = parsedHash['access_token'];

  if (!accessToken || Array.isArray(accessToken)) return '';

  // Remove 'access_token', etc. from hash
  window.location.hash = '';

  return accessToken;
};

const storeAccessToken = (accessToken: string): void => {
  const encodedAccessToken = window.btoa(window.btoa(accessToken));

  return window.localStorage.setItem(SESSION_KEY, encodedAccessToken);
};

const retrieveAccessToken = (key: string): string => {
  const encodedAccessToken = window.localStorage.getItem(SESSION_KEY);

  if (encodedAccessToken) {
    const accessToken = window.atob(window.atob(encodedAccessToken));

    return accessToken;
  }

  return '';
};

const getAccessToken = (): string => {
  let accessToken = retrieveAccessToken(SESSION_KEY);

  if (accessToken) return accessToken;

  accessToken = getAccessTokenFromUrlHash();

  if (accessToken) {
    storeAccessToken(accessToken);

    return accessToken;
  }

  return '';
};

const utils = {
  getAccessToken,
};

export default utils;
