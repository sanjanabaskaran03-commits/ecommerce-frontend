"use client";

import { useEffect, useRef } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

const PaymentView = ({ orderId }) => {
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!orderId || hasOpened.current) return;

    hasOpened.current = true;

    const initPayment = async () => {
      try {
        console.log("Starting payment with orderId:", orderId);

        // Load Razorpay script
        if (!window.Razorpay) {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;

          await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
          });
        }

        // 🔥 Call backend (NO amount here)
        const res = await fetch(`${API}/api/payment/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderId }),
        });

        const order = await res.json();
        console.log("Razorpay Order:", order);

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: "INR",
          order_id: order.id,

          name: "FASCO",

          handler: async function (response) {
  await fetch(`${API}/api/payment/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...response,
      orderId,
    }),
  });

  // ✅ Redirect instead of alert
  window.location.href = `/payment-success?orderId=${orderId}`;
},
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } catch (err) {
        console.error("Payment Error:", err);
      }
    };

    initPayment();
  }, [orderId]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      Opening payment gateway...
    </div>
  );
};

export default PaymentView;