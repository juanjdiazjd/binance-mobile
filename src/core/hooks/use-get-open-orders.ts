import {OrderContext, OrderContextType} from 'core/context/Orders';
import {useContext, useMemo, useState} from 'react';
import {OrderItem, OrderStatus} from 'types';

export const useGetOpenOrders = () => {
  const [openOrders, setOpenOrders] = useState<OrderItem[]>();
  const {orders} = useContext(OrderContext) as OrderContextType;

  useMemo(() => {
    const filteredOrders = orders?.filter(
      order => order.orderStatus === OrderStatus.Open,
    );
    setOpenOrders(filteredOrders);
  }, [orders]);
  return {
    openOrders,
  };
};
