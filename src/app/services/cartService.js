const API = "";
const USER_ID = "user123"; // replace with auth later

export const toggleCartAPI = async (productId) => {
  try {
    const res = await fetch(`${API}/api/cart/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: USER_ID,
        productId,
      }),
    });

    return await res.json();
  } catch (err) {
    console.error("toggleCartAPI error:", err);
    return null;
  }
};

// ========================
// GET CART
// ========================
export const getCartAPI = async () => {
  try {
    const res = await fetch(`${API}/api/cart?userId=${USER_ID}`);

    if (!res.ok) throw new Error("Failed to fetch cart");

    const data = await res.json();

    // DEBUG (keep for now)
    console.log("CART API RESPONSE:", data);

    return data;
  } catch (err) {
    console.error("getCartAPI error:", err);
    return {};
  }
};
