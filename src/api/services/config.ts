import Config from 'react-native-config';

const TRANSACTIONS_API_PREFIX = 'transactions';
const BALANCE_API_PREFIX = 'balance';
const RIPIO_API_PREFIX = 'v1';
const BTC_FEES_API_PREFIX = 'v1';

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
  balance: {
    create: 'POST',
  },
  rates: {
    get: 'GET',
  },
};

const URLS = {
  transactions: {
    get: `${TRANSACTIONS_API_PREFIX}/get`,
    create: `${TRANSACTIONS_API_PREFIX}/create`,
  },
  balance: {
    get: `${BALANCE_API_PREFIX}/getBalance`,
    update: `${BALANCE_API_PREFIX}/updateBalance`,
  },
  rates: {
    get: `${RIPIO_API_PREFIX}/rates/`,
  },
  fees: {
    get: `${BTC_FEES_API_PREFIX}/fees/recommended`,
  },
};

export {METHODS, URLS};

export default config;
