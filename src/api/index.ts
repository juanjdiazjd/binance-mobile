import createTransactions from './services/transactions';

const transactionsApi = {
  transactionServices: createTransactions(),
};

export default transactionsApi;
