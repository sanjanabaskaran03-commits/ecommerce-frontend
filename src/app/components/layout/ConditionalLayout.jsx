"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import BrandHeader from "./BrandHeader";
import Footer from "./Footer";
import SubscribeSection from "./SubscribeSection";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");
  const isAdminPage = pathname.startsWith("/admin");

  // ❌ Hide for auth + admin
  if (isAuthPage || isAdminPage) {
    return <>{children}</>;
  }

  // ✅ Show only for user pages
  return (
    <>
      <BrandHeader />
      <Navbar />
      {children}
      <SubscribeSection />
      <Footer />
    </>
  );
}