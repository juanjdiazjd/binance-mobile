import Config from 'react-native-config';

const BINANCE_API_PREFIX_ACTUAL_VERSION = 'v3';

const TIMEOUTS = {
  FAST: 3e3,
  INIT: 10e3,
  GLOBAL: 60e3,
  UNIT: 5e3,
};

const config = {
  baseURL: Config.URL_API_BINANCE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUTS.GLOBAL,
};

export {TIMEOUTS};
const METHODS = {
  binance: {
    ticker: 'GET',
  },
};

const URLS = {
  binance: {
    ticker: `${BINANCE_API_PREFIX_ACTUAL_VERSION}/ticker/price`,
  },
};

export {METHODS, URLS};

export default config;
