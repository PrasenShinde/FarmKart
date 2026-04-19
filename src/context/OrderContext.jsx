import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const OrderContext = createContext();

export function useOrders() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('farmkart_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('farmkart_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: Date.now(),
      orderNumber: `ORD-${Math.floor(Math.random() * 10000)}-${Math.random().toString(36).substr(2, 2).toUpperCase()}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'Ordered',
      progress: 0,
      expectedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    };
    
    setOrders(prev => [newOrder, ...prev]);
  };

  const value = {
    orders,
    placeOrder,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}
