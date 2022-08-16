import {DefaultTheme} from '@react-navigation/native';
import {Platform} from 'react-native';
import {strings} from 'screens/Home/strings';
import {ItemsHomeStackList} from 'types/Home';
import HomeScreen from 'screens/Home';
import OrderBookScreen from 'screens/OrderBook';
import {TabItemContent} from 'core/navigation';
import ExchangeScreen from 'screens/Exchange';

export const SUPPORT_NOTCH =
  Platform.OS === 'ios' ||
  (Platform.OS === 'android' && Platform.Version >= 23);
export const IS_ANDROID = Platform.OS === 'android';

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    border: 'rgb(216, 216, 216)',
    card: 'rgb(255, 255, 255)',
    notification: 'rgb(255, 59, 48)',
    primary: '#6d07e6',
    text: 'rgb(28, 28, 30)',
    background: '#003366',
  },
};

export const icons: Record<string, string> = {
  Home: 'home',
  BuySell: 'dollar',
  OrderBook: 'book',
};

export const screenNameByRouteName: Partial<Record<string, string>> = {
  [ItemsHomeStackList.Home]: strings.home.homeTitle,
  [ItemsHomeStackList.Exchange]: strings.home.exchange,
  [ItemsHomeStackList.OrderBook]: strings.home.orderBook,
};

export const TabList: TabItemContent[] = [
  {
    route: 'Home',
    label: strings.home.homeTitle,
    icon: 'home',
    component: HomeScreen,
  },
  {
    route: 'Exchange',
    label: strings.home.exchange,
    icon: 'usd',
    component: ExchangeScreen,
  },
  {
    route: 'OrderBook',
    label: strings.home.orderBook,
    icon: 'book',
    component: OrderBookScreen,
  },
];

export const mountToSatoshi = (mount: number): string =>
  (mount / 100000000).toFixed(8);
