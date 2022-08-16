import {useMemo} from 'react';
import {useState} from 'react';
import {CryptoItems} from 'screens/Exchange/utils';
import {ResponseTickerPrice} from 'types/Binance';
import {CryptoItem} from 'types/ListCryptoItem';
import {useGetCryptoPrice} from './use-get-crypto-price';

export const useGenerateCryptoData = () => {
  const [items] = useState<CryptoItem[]>(CryptoItems);
  const {data, isValidating, mutate} = useGetCryptoPrice();

  useMemo(() => {
    data?.map((currency: ResponseTickerPrice, index: number) => {
      items[index].price = currency.price;
    });
  }, [data, items]);

  return {
    items,
    isValidating,
    mutate,
  };
};
