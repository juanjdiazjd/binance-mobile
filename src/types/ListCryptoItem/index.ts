export enum CryptoCurrencies {
  Bitcoin = 'Bitcoin',
  Ethereum = 'Ethereum',
  USDCoin = 'USDCoin',
}
export enum Codes {
  Bitcoin = 'BTC',
  Ethereum = 'ETH',
  USDCoin = 'USDC',
}
export enum CryptoCurrencyType {
  VOLATILE = 'VOLATILE',
  STABLE = 'STABLE',
}
export type CryptoItem = {
  id: number;
  displayName: CryptoCurrencies;
  code: Codes;
  type: CryptoCurrencyType;
  price: string;
};

export enum CurrencyType {
  dollar = 'dollar',
  peso = 'peso',
}
