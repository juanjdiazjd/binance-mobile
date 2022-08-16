export enum TransactionType {
  Buy = 'buy',
  Sell = 'sell',
}

export enum OrderType {
  Limit = 'Limit',
  Market = 'Market',
}

export type Order = {
  orderType: OrderType;
};
