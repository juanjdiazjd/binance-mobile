import theme from 'core/theme';
import dayjs from 'dayjs';
import {TransactionType} from 'types';

export const colorByTransactionType: Partial<Record<TransactionType, string>> =
  {
    [TransactionType.Buy]: theme.colors.green,
    [TransactionType.Sell]: theme.colors.red,
  };
export const parseDate = (date: string, complete: boolean): string => {
  return complete
    ? dayjs(date).format('DD/MM/YYYY hh:mm:ss')
    : dayjs(date).format('DD/MM/YYYY');
};
