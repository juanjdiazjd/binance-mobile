import theme from 'core/theme';
import dayjs from 'dayjs';
import {Codes, CryptoCurrencies, TransactionType} from 'types';

export const codeByCurrencyName: Record<CryptoCurrencies, Codes> = {
  [CryptoCurrencies.Bitcoin]: Codes.Bitcoin,
  [CryptoCurrencies.Ethereum]: Codes.Ethereum,
  [CryptoCurrencies.USDCoin]: Codes.USDCoin,
};

export const colorByTransactionType: Record<TransactionType, string> = {
  [TransactionType.Buy]: theme.colors.green,
  [TransactionType.Sell]: theme.colors.red,
};
export const parseDate = (date: string, complete: boolean): string => {
  return complete
    ? dayjs(date).format('DD/MM/YYYY hh:mm:ss')
    : dayjs(date).format('DD/MM/YYYY');
};
