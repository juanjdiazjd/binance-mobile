import Config from 'react-native-config';
import {
  RequestUpdateBalance,
  ResponseGetBalance,
} from '../../types/responseType';
import buildApi from '../api';
import {URLS} from './config';
const {balance} = URLS;

const createApi = () => {
  // @ts-ignore
  const {post, get} = buildApi({baseURL: Config.URL_API_TRANSACTIONS});
  return {
    getBalance: (): Promise<ResponseGetBalance> =>
      get(balance.get).then(res => res.data as ResponseGetBalance),
    updateBalance: (request: RequestUpdateBalance, config = {}) =>
      post(balance.update, request, config),
  };
};

export default createApi;
