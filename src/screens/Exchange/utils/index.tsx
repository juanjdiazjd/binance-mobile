import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components';
import {
  Codes,
  CryptoCurrencies,
  CryptoCurrencyType,
  CryptoItem,
} from 'types/ListCryptoItem';
import BitcoinLogo from '../../../assets/bitcoin.svg';
import EthereumLogo from '../../../assets/ethereum.svg';
import USDCoinLogo from '../../../assets/usdcoin.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from 'core/theme';
import {strings} from '../strings';
import {TransactionType} from 'types';

const ContainerBottomView = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
`;

const Button = styled(TouchableOpacity)`
  padding: 10px;
  border-radius: 5px;
  background-color: ${theme.colors.gray};
`;

const TextTitle = styled(Text)`
  color: ${theme.colors.titleText}
  font-size: 24px;
  font-weight: bold;
  align-self: center;
`;
const TextBuySell = styled(Text)`
  color: ${theme.colors.titleText}
  font-size: 24px;
  align-self: center;
`;

const Column = styled(View)`
  flex-direction: column;
`;

export const renderContainerBottomSheet = (
  itemSelected: CryptoItem,
  handleOnPressBuySell: (option: TransactionType) => void,
) => (
  <Column>
    <TextTitle>{itemSelected.displayName}</TextTitle>
    <ContainerBottomView>
      <Button onPress={() => handleOnPressBuySell(TransactionType.Buy)}>
        <TextBuySell>
          <Icon
            name={'plus-circle-outline'}
            size={24}
            color={theme.colors.titleTextSecondary}
          />
          {` ${strings.buySell.buy}`}
        </TextBuySell>
      </Button>
      <Button onPress={() => handleOnPressBuySell(TransactionType.Sell)}>
        <TextBuySell>
          <Icon
            name={'minus-circle-outline'}
            size={24}
            color={theme.colors.titleTextSecondary}
          />
          {` ${strings.buySell.sell}`}
        </TextBuySell>
      </Button>
    </ContainerBottomView>
  </Column>
);

export const logoByName: Record<
  CryptoCurrencies,
  (size: number) => JSX.Element
> = {
  [CryptoCurrencies.Bitcoin]: (size: number) => (
    <BitcoinLogo width={size} height={size} />
  ),
  [CryptoCurrencies.Ethereum]: (size: number) => (
    <EthereumLogo width={size} height={size} />
  ),
  [CryptoCurrencies.USDCoin]: (size: number) => (
    <USDCoinLogo width={size} height={size} />
  ),
};

export const CryptoItems: CryptoItem[] = [
  {
    id: 1,
    type: CryptoCurrencyType.VOLATILE,
    displayName: CryptoCurrencies.Bitcoin,
    code: Codes.Bitcoin,
    price: '0',
  },
  {
    id: 2,
    type: CryptoCurrencyType.VOLATILE,
    displayName: CryptoCurrencies.Ethereum,
    code: Codes.Ethereum,
    price: '0',
  },
  {
    id: 3,
    type: CryptoCurrencyType.STABLE,
    displayName: CryptoCurrencies.USDCoin,
    code: Codes.USDCoin,
    price: '0',
  },
];
