import queryString from 'query-string';

const SESSION_KEY = 'vtodo-dropbox-session';
const CONFIG_KEY = 'vtodo-config';

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

const storeValue = (key: string, value: string): void => {
  const encodedValue = window.btoa(window.btoa(value));

  return window.localStorage.setItem(key, encodedValue);
};

const retrieveValue = (key: string): string => {
  const encodedValue = window.localStorage.getItem(key);

  if (encodedValue) {
    const value = window.atob(window.atob(encodedValue));

    return value;
  }

  return '';
};

const getAccessToken = (): string => {
  let accessToken = retrieveValue(SESSION_KEY);

  if (accessToken) return accessToken;

  accessToken = getAccessTokenFromUrlHash();

  if (accessToken) {
    storeValue(SESSION_KEY, accessToken);

    return accessToken;
  }

  return '';
};

const clearAccessToken = () => window.localStorage.removeItem(SESSION_KEY);

const getConfig = (): any => {
  const config = retrieveValue(CONFIG_KEY);

  if (config) {
    return JSON.parse(config);
  }

  return null;
};

const setConfig = (config: any) =>
  storeValue(CONFIG_KEY, JSON.stringify(config));

const clearConfig = () => window.localStorage.removeItem(CONFIG_KEY);

const clearStorage = () => {
  clearAccessToken();
  clearConfig();
};

const utils = {
  getAccessToken,
  getConfig,
  setConfig,
  clearStorage,
};

export default utils;
