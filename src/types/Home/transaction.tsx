export enum Status {
  completed = 'completed',
  failed = 'failed',
}
export type Transaction = {
  id: string;
  date: string;
  mount: string;
  address: string;
  status: Status;
};
export type Transactions = {
  Transactions: Transaction[];
  ErrorMsg: string;
};
