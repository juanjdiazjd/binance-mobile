import Config from 'react-native-config';
import {Rates} from '../../types/responseType';
import buildApi from '../api';
import {URLS} from './config';
const {rates} = URLS;

const createApi = () => {
  // @ts-ignore
  const {get} = buildApi({baseURL: Config.API_RIPIO_RATES});
  return {
    getRates: (): Promise<Rates> =>
      get(rates.get).then(res => res.data as Promise<Rates>),
  };
};

export default createApi;
