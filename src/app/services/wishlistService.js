const API = process.env.NEXT_PUBLIC_API_URL;
const USER_ID = "user123";

export const toggleWishlistAPI = async (productId) => {
  await fetch(`${API}/api/wishlist/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: USER_ID,
      productId,
    }),
  });
};

export const getWishlistAPI = async () => {
  const res = await fetch(`${API}/api/wishlist?userId=${USER_ID}`);
  return res.json();
};