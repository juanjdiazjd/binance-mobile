import {CryptoCurrencies} from 'types';
import {OrderType, TransactionType} from 'types/Exchange';

export enum OrderStatus {
  Close = 'close',
  Open = 'open',
}

export type OrderItem = {
  id: string;
  orderType?: OrderType;
  orderStatus: OrderStatus;
  date: string;
  amount: string;
  currency?: CryptoCurrencies;
  transactionType: TransactionType;
  timeRemaining: number;
};
