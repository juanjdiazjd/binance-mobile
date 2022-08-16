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
import {colorByTransactionType, parseDate} from './utils';
import {logoByName} from 'screens/Exchange/utils';
import CountDown from 'react-native-countdown-component';
import {useCallback, useContext} from 'react';
import {ContextType, OrderContext} from 'core/context';

const DEFAULT_LOGO_CRYPTO_SIZE = 50;

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
  top: 10%;
  padding-left: 20px;
  font-size: 20px;
`;

export const TextDate = styled(Text)`
  top: 15%;
  color: ${theme.colors.titleTextSecondary};
  padding-left: 20px;
  font-size: 18px;
`;

export const Column = styled(View)`
  flex-direction: column;
`;

export const Row = styled(View)`
  flex-direction: row;
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
  const {closeOrder} = useContext(OrderContext) as ContextType;
  const renderLogo = logoByName[item.currency ?? CryptoCurrencies.Bitcoin];

  const handleOnFinish = useCallback(
    (id: string) => {
      closeOrder(id);
    },
    [closeOrder],
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
          <CountDown
            until={item.timeRemaining}
            style={styles.countDown}
            digitStyle={styles.digitStyle}
            digitTxtStyle={{color: theme.colors.charcoalGray}}
            timeLabelStyle={styles.labelStyle}
            onFinish={() => handleOnFinish(item.id)}
            timeToShow={['S']}
            size={20}
          />
          <TextMount>$ {item.amount}</TextMount>
        </Column>
      </ListContainer>
    </ComponentContainer>
  );
};

const styles = StyleSheet.create({
  countDown: {padding: 8},
  digitStyle: {
    backgroundColor: theme.colors.secondary,
    height: 30,
    width: 30,
    borderRadius: 30,
  },
  labelStyle: {display: 'none'},
});
export default ListOrderItem;
