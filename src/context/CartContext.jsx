import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '../components/ui/Toast';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('farmkart_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem('farmkart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        // If already in cart, just increment a mock quantity field by 1 min unit
        // Usually, buyers select how many units they want. We'll simplify and add 1 by default.
        return prev.map(item => 
          item.id === product.id ? { ...item, cartQuantity: (item.cartQuantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, cartQuantity: 1 }];
    });
    addToast({ title: 'Added to Cart', description: `${product.name} has been added.`, variant: 'success' });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * (item.cartQuantity || 1)), 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
