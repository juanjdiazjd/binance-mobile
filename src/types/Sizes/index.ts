export type Rates = {
  base: string;
  rates: {[key: string]: number};
  names: {[key: string]: {[key: string]: string}};
  variation: {[key: string]: string};
};

export enum TransactionStatus {
  completed = 'completed',
  failed = 'failed',
}
