import createBinanceApi from './services/binance';

const apiServices = {
  binanceServices: createBinanceApi(),
};

export default apiServices;
