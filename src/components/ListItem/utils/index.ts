import theme from '../../../theme';
import {Status} from '../../../types/Home/transaction';
const dayjs = require('dayjs');

export const colorByStatus = (status?: Status): string => {
  switch (status) {
    case Status.completed:
      return theme.colors.green;
    default:
      return theme.colors.red;
  }
};

export const parseDate = (date: string, complete: boolean): string => {
  return complete
    ? dayjs(date).format('DD/MM/YYYY hh:mm:ss')
    : dayjs(date).format('DD/MM/YYYY');
};
