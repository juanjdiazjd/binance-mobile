import * as React from 'react';
import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ContentView, Header, WrapperView} from '@components';
import {strings} from './strings';
import {RootStackParamList} from 'types/Navigation';
import theme from 'core/theme';
import styled from 'styled-components';
import {logoByName} from 'screens/Exchange/utils';
import {formatToFiat} from 'components/List/ListCryptoItem/utils';
import {CurrencyType, TransactionType, OrderType, OrderStatus} from 'types';
import {useCallback, useContext, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getPrice, renderClose} from './utils';
import CurrencyInput from 'react-native-currency-input';
import Toast from 'react-native-toast-message';
import {ContextType, OrderContext} from 'core/context';
import uuid from 'react-native-uuid';

const DEFAULT_LOGO_CRYPTO_SIZE = 80;
const USD_STABLE_COIN = 'BUSD';
const MIN_VALUE = 0.0;

type OrderOptions = {
  label: OrderType;
  value: string;
};

const data = [
  {label: OrderType.Limit, value: '1'},
  {label: OrderType.Market, value: '2'},
];

const Column = styled(View)`
  flex-direction: column;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;
const TextCustom = styled(Text)<{
  fontSize: number;
  color?: string;
}>`
  font-size: ${({fontSize}) => fontSize}px;
  color: ${({color}) => (color ? color : theme.colors.white)};
`;

const CryptoCurrencyInput = styled(CurrencyInput)`
  height: 50px;
  width: 220px;
  border-width: 2px;
  border-radius: 10px;
  border-color: ${theme.colors.primaryDark};
  padding: 10px;
  color: ${theme.colors.white};
  font-size: 20px;
  background-color: ${theme.colors.charcoalGray};
`;

const ButtonExec = styled(Pressable)<{
  backgroundColor: string;
}>`
  align-items: center;
  justify-content: center;
  padding-vertical: 12px;
  padding-horizontal: 32px;
  border-radius: 4px;
  elevation: 3;
  background-color: ${({backgroundColor}) => backgroundColor};
`;

const OrderScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Order'>) => {
  const {item, option} = route.params;
  const [number, setNumber] = React.useState<number>(0);
  const [order, setOrder] = useState<OrderOptions>();
  const [isFocus, setIsFocus] = useState(false);

  const {saveOrder} = useContext(OrderContext) as ContextType;

  const onChangeValue = useCallback((inputText: number) => {
    setNumber(inputText);
  }, []);

  const handleSetValue = useCallback((orderOptions: OrderOptions) => {
    setOrder(orderOptions);
  }, []);

  const handleExecOnPress = useCallback(() => {
    saveOrder({
      id: uuid.v4().toString(),
      date: new Date().toString(),
      amount: getPrice(option, number, parseFloat(item.price)),
      orderType: order?.label ?? OrderType.Market,
      currency: item.displayName,
      transactionType: option,
      timeRemaining: 60,
      orderStatus:
        order?.label === OrderType.Market
          ? OrderStatus.Close
          : OrderStatus.Open,
    });
    navigation.goBack();
    Toast.show({
      type: 'success',
      text1: `${strings.order.orderSuccess}${
        order?.label === OrderType.Market
          ? strings.order.orderClose
          : strings.order.orderOpen
      }`,
      text2: strings.order.thanks,
    });
  }, [
    navigation,
    order,
    item.displayName,
    item.price,
    number,
    option,
    saveOrder,
  ]);

  const renderLogo = logoByName[item.displayName];

  return (
    <WrapperView keyboardAvoidingView={true}>
      <ContentView>
        <StatusBar barStyle="light-content" />
        <Header
          title={strings.order.infoTitle}
          subtitle={strings.order[option]}
          secondaryButton={() => renderClose(() => navigation.goBack())}
        />
        <Column>
          <Row>{renderLogo(DEFAULT_LOGO_CRYPTO_SIZE)}</Row>
          <Row>
            <TextCustom fontSize={18}>{item.displayName}</TextCustom>
          </Row>
          <Row>
            <TextCustom
              color={theme.colors.secondary}
              fontSize={24}>{`${formatToFiat(
              parseFloat(item.price),
              CurrencyType.dollar,
            )} ${USD_STABLE_COIN}`}</TextCustom>
          </Row>
          <Row>
            <CryptoCurrencyInput
              value={number}
              autoFocus
              keyboardType={'number-pad'}
              onChangeValue={onChangeValue}
              placeholder={`${
                option !== TransactionType.Buy ? '0.00000000 ' : '0.00 '
              }${
                option !== TransactionType.Buy ? item?.code : USD_STABLE_COIN
              }`}
              placeholderTextColor={theme.colors.titleTextSecondary}
              delimiter="."
              separator=","
              precision={option !== TransactionType.Buy ? 8 : 2}
              minValue={MIN_VALUE}
            />
          </Row>
          <Row>
            <TextCustom fontSize={18}>
              {`${strings.order.receive} ${getPrice(
                option,
                number,
                parseFloat(item.price),
              )} ${
                option === TransactionType.Buy ? item?.code : USD_STABLE_COIN
              }`}
            </TextCustom>
          </Row>
          <TextCustom fontSize={16}>{strings.order.orderType}</TextCustom>
          <Dropdown
            style={[styles.dropdown]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? strings.order.selectItem : '...'}
            value={order}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(orderOption: OrderOptions) => {
              handleSetValue(orderOption);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <Icon name={'book'} size={24} color={theme.colors.primary} />
            )}
          />
          <Column>
            <Row>
              <ButtonExec
                onPress={handleExecOnPress}
                disabled={!number || !order}
                backgroundColor={
                  !number || !order
                    ? theme.colors.charcoalGray
                    : theme.colors.green
                }>
                <TextCustom fontSize={20}>{strings.order[option]}</TextCustom>
              </ButtonExec>
            </Row>
          </Column>
        </Column>
      </ContentView>
    </WrapperView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default OrderScreen;
