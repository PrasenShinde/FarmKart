import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export function useProducts() {
  return useContext(ProductContext);
}

// Initial dummy products moved from Marketplace
const initialDummyProducts = [
  { id: 1, name: 'Organic Tomatoes', category: 'Vegetables', farmer: 'Ramesh Patil', price: 45, unit: 'kg', quantity: 50, location: 'Nashik, MH', rating: 4.8, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Fresh Potatoes', category: 'Vegetables', farmer: 'Suresh Kumar', price: 30, unit: 'kg', quantity: 200, location: 'Pune, MH', rating: 4.5, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Premium Apples', category: 'Fruits', farmer: 'Himachal Orchards', price: 120, unit: 'kg', quantity: 40, location: 'Shimla, HP', rating: 4.9, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6caa6?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Green Cabbage', category: 'Vegetables', farmer: 'Anita Devi', price: 25, unit: 'kg', quantity: 80, location: 'Surat, GJ', rating: 4.6, image: 'https://images.unsplash.com/photo-1533529323315-998e3bbf49a9?auto=format&fit=crop&q=80&w=800' },
  { id: 5, name: 'Alphonso Mangoes', category: 'Fruits', farmer: 'Ratnagiri Farms', price: 800, unit: 'dozen', quantity: 20, location: 'Ratnagiri, MH', rating: 4.9, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=800' },
  { id: 6, name: 'Basmati Rice', category: 'Grains', farmer: 'Punjab Agrico', price: 95, unit: 'kg', quantity: 500, location: 'Amritsar, PB', rating: 4.7, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800' },
  { id: 7, name: 'Red Onions', category: 'Vegetables', farmer: 'Kisan Krushi', price: 35, unit: 'kg', quantity: 150, location: 'Nashik, MH', rating: 4.4, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=800' },
  { id: 8, name: 'Fresh Spinach', category: 'Leafy Greens', farmer: 'Green Valley', price: 20, unit: 'bunch', quantity: 100, location: 'Pune, MH', rating: 4.8, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800' },
];

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    // Try to load from localStorage first
    const saved = localStorage.getItem('farmkart_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialDummyProducts;
      }
    }
    return initialDummyProducts;
  });

  useEffect(() => {
    localStorage.setItem('farmkart_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    // Generate a unique ID
    const productWithId = {
      ...newProduct,
      id: Date.now(),
      rating: 0 // New products start with 0 rating
    };
    setProducts(prev => [productWithId, ...prev]);
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const value = {
    products,
    addProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
