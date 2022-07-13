import Config from 'react-native-config';
import {Fee} from '../../types/responseType';
import buildApi from '../api';
import {URLS} from './config';
const {fees} = URLS;

const createApi = () => {
  // @ts-ignore
  const {get} = buildApi({baseURL: Config.API_BTC_FEES});
  return {
    getFee: (): Promise<Fee> =>
      get(fees.get).then(res => res.data as Promise<Fee>),
  };
};

export default createApi;
