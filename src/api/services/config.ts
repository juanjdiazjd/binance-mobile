import Config from 'react-native-config';

const WEATHER_API_PREFIX = 'v1';

const TIMEOUTS = {
  FAST: 3e3,
  INIT: 10e3,
  GLOBAL: 60e3,
  UNIT: 5e3,
};

const config = {
  baseURL: Config.WEATHER_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: TIMEOUTS.GLOBAL,
};

export {TIMEOUTS};
const METHODS = {
  weather: {
    current: 'POST',
  },
};

const URLS = {
  weather: {
    current: `${WEATHER_API_PREFIX}/current`,
    forecast: `${WEATHER_API_PREFIX}/forecast`,
  },
};

export {METHODS, URLS};

export default config;
