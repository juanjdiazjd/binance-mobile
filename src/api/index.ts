import createTransactions from './services/transactions';
import createBalancesApi from './services/balance';
import createFeesApi from './services/fees';
import createRipioApi from './services/rates';

const transactionsApi = {
  transactionServices: createTransactions(),
  balanceServices: createBalancesApi(),
  feeServices: createFeesApi(),
  ripioServices: createRipioApi(),
};

export default transactionsApi;
