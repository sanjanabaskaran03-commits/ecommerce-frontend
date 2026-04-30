"use client";
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

function redirectToLogin() {
  if (typeof window === "undefined") return;
  const next = encodeURIComponent(
    `${window.location.pathname}${window.location.search || ""}`
  );
  window.location.href = `/auth/login?next=${next}`;
}

export const WishlistProvider = ({ children }) => {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await fetch(`${API}/api/wishlist`, {
        credentials: "include",
      });

      if (res.status === 401) {
        setWishlist([]);
        return;
      }

      const data = await res.json();
      setWishlist(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Wishlist fetch failed:", err);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!API) return;
    fetchWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API]);

  useEffect(() => {
    const onAuthChanged = () => fetchWishlist();
    window.addEventListener("auth-changed", onAuthChanged);
    return () => window.removeEventListener("auth-changed", onAuthChanged);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [API]);

  const toggleWishlist = async (product) => {
    try {
      const productId = product?._id || product?.id;
      if (!productId) return;

      const res = await fetch(`${API}/api/wishlist`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 401) {
        redirectToLogin();
        return;
      }

      await fetchWishlist();
    } catch (err) {
      console.error("Wishlist toggle failed:", err);
    }
  };

  const isInWishlist = (productId) => {
    const id = String(productId);
    return wishlist.some((item) => {
      const wishId = item?.productId?._id || item?.productId;
      return String(wishId) === id;
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistItems: wishlist, // compat
        loading,
        toggleWishlist,
        isInWishlist,
        refreshWishlist: fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
