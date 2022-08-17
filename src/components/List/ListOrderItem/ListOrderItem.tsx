import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CryptoCurrencies, OrderItem, TransactionType} from 'types';
import theme from 'core/theme';
import {codeByCurrencyName, colorByTransactionType, parseDate} from './utils';
import {logoByName} from 'screens/Exchange/utils';
import CountDown from 'react-native-countdown-component';
import {useCallback, useContext} from 'react';
import {OrderContextType, OrderContext} from 'core/context/Orders';
import {FeeContext, FeeContextType} from 'core/context/Fees';
import {calculateFee} from 'screens/Order/utils';

const DEFAULT_LOGO_CRYPTO_SIZE = 50;
const DEFAULT_STABLE_COIN = 'BUSD';

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

export const TextMount = styled(Text)`
  color: ${theme.colors.white};
  align-self: flex-end;
  font-size: 16px;
`;

export const TextCustom = styled(Text)<{
  color?: string;
}>`
  color: ${({color}) => color ?? theme.colors.white};
  padding-left: 20px;
  font-size: 20px;
`;

export const TextDate = styled(Text)`
  color: ${theme.colors.titleTextSecondary};
  padding-left: 20px;
  font-size: 18px;
`;

const Column = styled(View)`
  flex-direction: column;
`;

const Row = styled(View)`
  flex-direction: row;
`;
const ContainerCountDown = styled(View)`
  justify-content: flex-end;
`;
const CountDownView = styled(CountDown)`
  padding: 8px;
  align-self: flex-end;
`;

const CustomIcon = styled(Icon)<{
  transactionType: TransactionType;
}>`
  position: absolute;
  bottom: 5px;
  right: -15px;
  color: ${({transactionType}) => colorByTransactionType[transactionType]};
  width: 30px;
  height: 30px;
  padding-left: 2px;
  margin-top: 10px;
`;

interface ListOrderItemViewProps extends ViewProps {
  item: OrderItem;
}

export const ListOrderItem: React.FunctionComponent<ListOrderItemViewProps> = ({
  item,
}) => {
  const {saveFee} = useContext(FeeContext) as FeeContextType;
  const {closeOrder} = useContext(OrderContext) as OrderContextType;
  const renderLogo = logoByName[item.currency ?? CryptoCurrencies.Bitcoin];

  const handleOnFinish = useCallback(
    (id: string) => {
      saveFee(calculateFee(parseFloat(item.amount)));
      closeOrder(id);
    },
    [closeOrder, saveFee, item.amount],
  );
  return (
    <ComponentContainer>
      <ListContainer>
        <Row>
          <Column>
            {renderLogo(DEFAULT_LOGO_CRYPTO_SIZE)}
            <CustomIcon
              transactionType={item.transactionType}
              name={
                item.transactionType === TransactionType.Buy
                  ? 'plus-circle'
                  : 'minus-circle'
              }
              size={25}
            />
          </Column>
          <Column>
            <TextCustom>{`${item.currency}`}</TextCustom>
            <TextDate>{parseDate(item.date, false)}</TextDate>
          </Column>
        </Row>
        <Column>
          <ContainerCountDown>
            <CountDownView
              until={item.timeRemaining}
              digitStyle={styles.digitStyle}
              digitTxtStyle={{color: theme.colors.charcoalGray}}
              timeLabelStyle={styles.labelStyle}
              onFinish={() => handleOnFinish(item.id)}
              timeToShow={['S']}
              size={20}
            />
            <TextMount>{` ${item.amount} ${
              item.transactionType === TransactionType.Sell
                ? DEFAULT_STABLE_COIN
                : ''
            }${
              item.transactionType === TransactionType.Buy
                ? codeByCurrencyName[item?.currency ?? 'Bitcoin']
                : ''
            }`}</TextMount>
          </ContainerCountDown>
        </Column>
      </ListContainer>
    </ComponentContainer>
  );
};

const styles = StyleSheet.create({
  digitStyle: {
    backgroundColor: theme.colors.secondary,
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  labelStyle: {display: 'none'},
});
export default ListOrderItem;
