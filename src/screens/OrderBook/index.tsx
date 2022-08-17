import * as React from 'react';
import {FlatList, ListRenderItem, StatusBar, Text} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ContentView, Header, WrapperView} from '@components';
import {strings} from './strings';
import {RootStackParamList} from 'types/Navigation';
import {OrderItem, OrderStatus} from 'types';
import ListOrderItem from 'components/List/ListOrderItem/ListOrderItem';
import theme, {styled} from 'core/theme';
import {useGetOpenOrders} from 'core/hooks/use-get-open-orders';
import ShowFee from 'components/Fee/ShowFee';

const TextNotFound = styled(Text)`
  color: ${theme.colors.white};
  align-self: center;
  font-size: 16px;
`;

const OrderBookScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'OrderBook'>) => {
  const {openOrders} = useGetOpenOrders();

  const renderItem: ListRenderItem<OrderItem> = ({item}) => (
    <ListOrderItem item={item} />
  );

  return (
    <WrapperView>
      <ContentView>
        <StatusBar barStyle="light-content" />
        <Header
          title={strings.orderBook.infoTitle}
          subtitle={strings.orderBook.infoSubtitle}
          buttonBack={true}
          onPressButtonBack={() => navigation.goBack()}
          secondaryComponent={() => <ShowFee />}
        />
        {openOrders && openOrders?.length > 0 ? (
          <FlatList
            data={openOrders
              .filter(
                order =>
                  order.id !== '0' && order.orderStatus === OrderStatus.Open,
              )
              .sort(
                (a, b) =>
                  new Date(b.date).valueOf() - new Date(a.date).valueOf(),
              )}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <TextNotFound>{strings.orderBook.notFound}</TextNotFound>
        )}
      </ContentView>
    </WrapperView>
  );
};

export default OrderBookScreen;
