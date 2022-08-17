import {ButtonIcon} from '@components';
import {
  formatToCrypto,
  formatToFiat,
} from 'components/List/ListCryptoItem/utils';
import theme from 'core/theme';
import React from 'react';
import {TransactionType} from 'types';

const FEE = 1.5;

export const renderClose = (onHandlePress: () => void) => (
  <ButtonIcon
    onHandlePress={onHandlePress}
    iconName="keyboard-arrow-down"
    size={30}
    color={theme.colors.white}
  />
);

export const getPrice = (
  option: TransactionType,
  currencyInput: number,
  exchangeRate: number,
) =>
  option === TransactionType.Buy
    ? formatToCrypto(currencyInput / exchangeRate)
    : formatToFiat(exchangeRate * currencyInput);

export const calculateFee = (price: number) =>
  parseFloat((price * FEE).toFixed(2));
