import apiServices from 'core/api';
import {URLS} from 'core/api/services/config';
import useSWR from 'swr';

const {binance} = URLS;
const {binanceServices: binanceApi} = apiServices;

export const useGetCryptoPrice = () => {
  const {data, isValidating, mutate} = useSWR(
    [`${binance.ticker}`, '?symbols=["BTCBUSD","ETHBUSD","USDCBUSD"]'],
    binanceApi.getPrice,
  );
  return {
    data,
    isValidating,
    mutate,
  };
};
