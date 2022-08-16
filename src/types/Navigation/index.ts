import {TransactionType} from 'types/Exchange';
import {CryptoItem} from 'types/ListCryptoItem';

export type RootStackParamList = {
  Home: undefined;
  Exchange: undefined;
  OrderBook: undefined;
  Order: {item: CryptoItem; option: TransactionType};
};
