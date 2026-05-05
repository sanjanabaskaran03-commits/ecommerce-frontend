"use client";

import { useSearchParams } from "next/navigation";
import PaymentView from "@/src/app/components/payment/PaymentView";

export default function PaymentPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return <PaymentView orderId={orderId} />;
}