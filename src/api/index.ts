import createWeather from './services/weather';

const weatherApi = {
  weatherServices: createWeather(),
};

export default weatherApi;
