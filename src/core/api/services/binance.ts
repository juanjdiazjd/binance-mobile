import Config from 'react-native-config';
import {ResponseTickerPrice} from 'types/Binance';
import buildApi from '../api';

const createApi = () => {
  // @ts-ignore
  const {get} = buildApi({baseURL: Config.URL_API_BINANCE});
  return {
    getPrice: (url: string, symbols: string): Promise<ResponseTickerPrice[]> =>
      get(`${url}${symbols}`).then(res => res.data as ResponseTickerPrice[]),
  };
};

export default createApi;
