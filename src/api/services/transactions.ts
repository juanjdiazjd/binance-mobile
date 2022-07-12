import Config from 'react-native-config';
import {Transactions} from '../../types/Home/transaction';
import {RequestCreateTransaction} from '../../types/responseType';
import buildApi from '../api';
import {URLS} from './config';
const {transactions} = URLS;

const createApi = () => {
  // @ts-ignore
  const {post, get} = buildApi({baseURL: Config.URL_API_TRANSACTIONS});
  return {
    getTransactions: (): Promise<Transactions> =>
      get(transactions.get).then(res => res.data as Transactions),
    createTransaction: (request: RequestCreateTransaction, config = {}) =>
      post(transactions.create, request, config),
  };
};

export default createApi;
