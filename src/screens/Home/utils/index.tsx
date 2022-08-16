import * as React from 'react';

import theme from '../../../core/theme';

import {strings} from '../strings';
import SVGLogo from '../../../assets/binance-logo.svg';
import {Feature} from 'types/ListItem';
import {ItemsHomeStackList} from 'types/Home';

export const HomeFeatures: Feature[] = [
  {
    id: 1,
    image: 'https://i.imgur.com/a6qfBLb.png',
    title: strings.home.exchange,
    screenName: ItemsHomeStackList.Exchange,
    color: theme.colors.primary,
    backgroundColor: theme.colors.primaryDark,
  },
  {
    id: 2,
    image:
      'https://cdn.iconscout.com/icon/premium/png-256-thumb/crypto-book-4589750-3797205.png',
    title: strings.home.orderBook,
    screenName: ItemsHomeStackList.OrderBook,
    color: theme.colors.primary,
    backgroundColor: theme.colors.primaryDark,
  },
];

export const renderLogo = () => <SVGLogo width={200} height={36} />;
