import Config from 'react-native-config';
import { LatLong } from '../../types/Home/weather';
import buildApi from '../api';
import {URLS} from './config';
const {weather} = URLS;

const createApi = () => {
  // @ts-ignore
  const {post} = buildApi({baseURL: Config.WEATHER_API_URL});
  return {
    currentWeather: (request: LatLong, config = {}) =>
      post(weather.current, request, config),
    forecastWeather: (request: LatLong, config = {}) =>
      post(weather.forecast, request, config),
  };
};

export default createApi;
