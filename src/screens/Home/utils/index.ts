import {Fees, FeeTypes} from '../../../types/responseType';

const formatToCurrency = (amount: number) =>
  '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const getBalanceInFiat = (crypto: number, fiat: number) =>
  formatToCurrency(crypto * fiat);

export const mountToSatoshi = (mount: number): string =>
  (mount / 100000000).toFixed(8);

export const balanceAvailable = (
  myBalance: number,
  mountCalculated: number,
): boolean => myBalance - mountCalculated > 0;

export const feeTypeById = (id: number): FeeTypes => Fees[id - 1];
