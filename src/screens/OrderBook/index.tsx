import * as React from 'react';
import {FlatList, ListRenderItem, StatusBar} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ContentView, Header, WrapperView} from '@components';
import {strings} from './strings';
import {RootStackParamList} from 'types/Navigation';
import {useContext} from 'react';
import {ContextType, OrderContext} from 'core/context';
import {OrderItem, OrderStatus} from 'types';
import ListOrderItem from 'components/List/ListOrderItem/ListOrderItem';

const OrderBookScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'OrderBook'>) => {
  const {orders} = useContext(OrderContext) as ContextType;

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
        />
        {orders && (
          <FlatList
            data={orders
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
        )}
      </ContentView>
    </WrapperView>
  );
};

export default OrderBookScreen;
