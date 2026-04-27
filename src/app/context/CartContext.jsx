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
      .then(res => res.json())
      .then(data => {
        setCartItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Cart fetch failed:", err);
        setLoading(false);
      });
  }, []);

  // ✅ CHECK IF ITEM EXISTS
  const isInCart = (productId) => {
    return cartItems.some(
      (item) =>
        item.id === productId ||
        item._id === productId ||
        item.productId === productId
    );
  };

  // ✅ TOGGLE CART (ADD / REMOVE)
  const toggleCart = async (product) => {
    const productId = product.id || product._id;

    const exists = isInCart(productId);

    // 🔴 REMOVE FROM CART
    if (exists) {
      setCartItems((prev) =>
        prev.filter(
          (item) =>
            item.id !== productId &&
            item._id !== productId &&
            item.productId !== productId
        )
      );

      try {
        await fetch(`${API_URL}/api/cart?id=${productId}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.error("Remove failed:", error);
      }

      return;
    }

    // 🟢 ADD TO CART
    setCartItems((prev) => [...prev, { ...product, qty: 1 }]);

    try {
      await fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId, action: 'add' }),
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

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

  return (
    <CartContext.Provider value={{
      cartItems,
      toggleCart,
      updateQuantity,
      loading,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);