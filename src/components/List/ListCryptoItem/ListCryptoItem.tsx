import * as React from 'react';
import {Text, TouchableOpacity, View, ViewProps} from 'react-native';
import styled from 'styled-components';
import theme from 'core/theme';
import {CryptoItem} from 'types/ListCryptoItem';
import {formatToFiat, skeletonSizeByCrypto} from './utils';
import LinearGradient from 'react-native-linear-gradient';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {logoByName} from 'screens/Exchange/utils';

const DEFAULT_SKELETON_SIZE = 100;
const DEFAULT_LOGO_CRYPTO_SIZE = 40;
const USD_STABLE_COIN = 'BUSD';

const ListContainer = styled(TouchableOpacity)`
  background-color: ${theme.colors.charcoalGray};
  height: auto;
  width: 350px;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const ComponentContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  height: auto;
  width: auto;
`;

const TextMount = styled(Text)`
  color: white;
  align-self: flex-end;
  font-size: 18px;
`;

const TextCode = styled(Text)<{
  color?: string;
}>`
  color: ${({color}) => color ?? theme.colors.titleText};
  padding-left: 20px;
  font-weight: bold;
  font-size: 16px;
`;
const TextDisplayName = styled(Text)`
  color: ${theme.colors.titleTextSecondary};
  padding-left: 20px;
  font-size: 16px;
`;

const Column = styled(View)`
  flex-direction: column;
`;

const Row = styled(View)`
  flex-direction: row;
`;

const Skeleton = styled(ShimmerPlaceHolder)<{
  width: number;
}>`
  width: ${({width}) => width}px;
  border-radius: 30px;
  align-self: center;
`;

interface ListCryptoItemViewProps extends ViewProps {
  item: CryptoItem;
  handleOnPress: (item: CryptoItem) => void;
  isValidating: boolean;
  isDisabled: boolean;
}

export const ListCryptoItem: React.FunctionComponent<
  ListCryptoItemViewProps
> = ({item, handleOnPress, isValidating, isDisabled}) => {
  const size = skeletonSizeByCrypto[item.displayName];
  const renderLogo = logoByName[item.displayName];
  return (
    <ComponentContainer>
      <ListContainer disabled={isDisabled} onPress={() => handleOnPress(item)}>
        <Row>
          <Column>{renderLogo(DEFAULT_LOGO_CRYPTO_SIZE)}</Column>
          <Column>
            <TextCode>{item.code}</TextCode>
            <TextDisplayName>{item.displayName}</TextDisplayName>
          </Column>
        </Row>
        {isValidating ? (
          <Skeleton
            width={size ?? DEFAULT_SKELETON_SIZE}
            LinearGradient={LinearGradient}
          />
        ) : (
          <TextMount>{`${formatToFiat(
            parseFloat(item?.price ?? '0'),
          )} ${USD_STABLE_COIN}`}</TextMount>
        )}
      </ListContainer>
    </ComponentContainer>
  );
};

export default ListCryptoItem;
