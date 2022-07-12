import Config from 'react-native-config';

const TRANSACTIONS_API_PREFIX = 'transactions';

const TIMEOUTS = {
  FAST: 3e3,
  INIT: 10e3,
  GLOBAL: 60e3,
  UNIT: 5e3,
};

const config = {
  baseURL: Config.URL_API_TRANSACTIONS,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUTS.GLOBAL,
};

export {TIMEOUTS};
const METHODS = {
  transactions: {
    create: 'POST',
  },
};

const URLS = {
  transactions: {
    get: `${TRANSACTIONS_API_PREFIX}/get`,
    create: `${TRANSACTIONS_API_PREFIX}/create`,
  },
};

export {METHODS, URLS};

export default config;
