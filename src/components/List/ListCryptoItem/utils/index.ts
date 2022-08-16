import {CryptoCurrencies, CurrencyType} from 'types/ListCryptoItem';

export const formatToFiat = (amount: number, currencyType?: CurrencyType) =>
  `${currencyType === CurrencyType.peso ? '$' : ''}` +
  amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const formatToCrypto = (amount: number) =>
  amount.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const skeletonSizeByCrypto: Partial<Record<CryptoCurrencies, number>> = {
  [CryptoCurrencies.Bitcoin]: 100,
  [CryptoCurrencies.Ethereum]: 100,
  [CryptoCurrencies.USDCoin]: 60,
};
