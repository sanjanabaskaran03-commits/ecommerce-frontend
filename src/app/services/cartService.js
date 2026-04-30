const API = process.env.NEXT_PUBLIC_API_URL;
const USER_ID = "user123"; // temporary

export const toggleCartAPI = async (productId) => {
  await fetch(`${API}/api/cart/toggle`, {
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

export const getCartAPI = async () => {
  const res = await fetch(`${API}/api/cart?userId=${USER_ID}`);
  return res.json();
};