"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/cart');
        const data = await res.json();

        if (data && data.items) {
          const formattedItems = data.items.map(item => ({
            ...item.productId, 
            qty: item.qty,
            _id: item.productId._id,
            id: item.productId._id
          }));
          
          setCartItems(formattedItems);
        }
      } catch (error) {
        console.error("Cart fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (productId, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item.id === productId || item._id === productId || item.productId === productId) 
          ? { ...item, qty: newQty } 
          : item
      )
    );

    try {
      await fetch('/api/cart', {
        method: 'PATCH', 
        body: JSON.stringify({ productId, qty: newQty }),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("Failed to sync quantity:", error);
    }
  };

  const addToCart = async (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id || item._id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          (item.id === product.id || item._id === product.id) ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });

    try {
      await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId: product.id, action: 'add' }),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    setCartItems((prev) => prev.filter(item => (item.id !== id && item._id !== id)));
    try {
      await fetch(`/api/cart?id=${id}`, { method: 'DELETE' });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      loading 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);