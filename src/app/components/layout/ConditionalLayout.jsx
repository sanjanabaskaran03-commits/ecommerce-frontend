"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import BrandHeader from "./BrandHeader";
import Footer from "./Footer";
import SubscribeSection from "./SubscribeSection";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    return <>{children}</>;
  }

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