"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

function redirectToLogin() {
  if (typeof window === "undefined") return;
  const next = encodeURIComponent(
    `${window.location.pathname}${window.location.search || ""}`
  );
  window.location.href = `/auth/login?next=${next}`;
}

function normalizeCartItems(items) {
  if (!Array.isArray(items)) return [];

  return items
    .map((row) => {
      const product = row?.productId;
      if (!product?._id) return null;

      const qty = Number(row?.quantity ?? 1) || 1;
      const img = product.image || product.img || "/images/sample.jpg";
      const discountPercent = Number(product.discountPercent ?? 0) || 0;

      return {
        _id: product._id,
        id: product._id,
        title: product.title,
        price: product.price,
        img,
        qty,
        category: product.category,
        description: product.description,
        rating: product.rating,
        stock: product.stock,
        discountPercent,
      };
    })
    .filter(Boolean);
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const res = await fetch(`/api/cart`, {
        credentials: "include",
      });

      if (res.status === 401) {
        setCartItems([]);
        setSavedItems([]);
        return;
      }

      const data = await res.json();
      setCartItems(normalizeCartItems(data?.items));
      setSavedItems(normalizeCartItems(data?.savedItems));
    } catch (err) {
      console.error("Cart fetch failed:", err);
      setCartItems([]);
      setSavedItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    const onAuthChanged = () => loadCart();
    window.addEventListener("auth-changed", onAuthChanged);
    return () => window.removeEventListener("auth-changed", onAuthChanged);
  }, []);

  const isInCart = (productId) =>
    cartItems.some((item) => String(item?._id) === String(productId));

  const addToCart = async (product, quantity = 1) => {
    try {
      const productId = product?._id || product?.id;
      if (!productId) return false;

      const res = await fetch(`/api/cart/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      if (res.status === 401) {
        redirectToLogin();
        return false;
      }

      await loadCart();
      return true;
    } catch (err) {
      console.error("Cart add failed:", err);
      return false;
    }
  };

  const toggleCart = async (product) => {
    try {
      const productId = product?._id || product?.id;
      if (!productId) return;

      const res = await fetch(`/api/cart/toggle`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 401) {
        redirectToLogin();
        return;
      }

      await loadCart();
    } catch (err) {
      console.error("Cart toggle failed:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const res = await fetch(`/api/cart/remove`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 401) {
        redirectToLogin();
        return;
      }

      await loadCart();
    } catch (err) {
      console.error("Cart remove failed:", err);
    }
  };

  const toggleSaveForLater = async (productId) => {
  try {
    const res = await fetch(`/api/wishlist`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (res.status === 401) {
      window.location.href = "/auth/login";
      return;
    }

    // ✅ REMOVE FROM CART
    await removeFromCart(productId);

    // ✅ TRIGGER GLOBAL REFRESH
    window.dispatchEvent(new Event("auth-changed"));

  } catch (err) {
    console.error(err);
  }
};

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await fetch(`/api/cart/quantity`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      if (res.status === 401) {
        redirectToLogin();
        return;
      }

      await loadCart();
    } catch (err) {
      console.error("Cart quantity update failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedItems,
        loading,
        isInCart,
        addToCart,
        toggleCart,
        removeFromCart,
        toggleSaveForLater,
        updateQuantity,
        refreshCart: loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
