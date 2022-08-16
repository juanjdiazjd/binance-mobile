import * as React from 'react';
import {
  CryptoCurrencies,
  OrderItem,
  OrderStatus,
  OrderType,
  TransactionType,
} from 'types';

type Props = {
  children: React.ReactNode;
};

export type ContextType = {
  orders: OrderItem[];
  saveOrder: (orderItem: OrderItem) => void;
  closeOrder: (id: string) => void;
};

const DEFAULT_VALUE: OrderItem[] = [
  {
    id: '0',
    orderType: OrderType.Limit,
    date: 'string',
    amount: '',
    currency: CryptoCurrencies.Bitcoin,
    transactionType: TransactionType.Buy,
    timeRemaining: 60,
    orderStatus: OrderStatus.Close,
  },
];
export const OrderContext = React.createContext<ContextType | null>(null);

export const OrderProvider = ({children}: Props) => {
  const [orders, setOrders] = React.useState<OrderItem[]>(DEFAULT_VALUE);

  const saveOrder = (orderItem: OrderItem) => {
    setOrders([...orders, orderItem]);
  };
  const closeOrder = (id: string) => {
    orders.filter((orderItem: OrderItem) => {
      if (orderItem.id === id) {
        orderItem.timeRemaining = 0;
        orderItem.orderStatus = OrderStatus.Close;
        setOrders([...orders]);
      }
    });
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        saveOrder,
        closeOrder,
      }}>
      {children}
    </OrderContext.Provider>
  );
};
