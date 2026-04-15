"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API_URL) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/api/cart`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        setCartItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Cart fetch failed:", err);
        setLoading(false);
      });
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
      await fetch(`${API_URL}/api/cart`, {
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
      const existingItem = prev.find(
        (item) => item.id === product.id || item._id === product.id
      );

      if (existingItem) {
        return prev.map((item) =>
          (item.id === product.id || item._id === product.id)
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    try {
      await fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId: product.id, action: 'add' }),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  };

  const removeFromCart = async (id) => {
    setCartItems((prev) =>
      prev.filter(item => (item.id !== id && item._id !== id))
    );

    try {
      await fetch(`${API_URL}/api/cart?id=${id}`, {
        method: 'DELETE'
      });
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