
import "./globals.css";

import { CustomThemeProvider } from "@/src/app/context/ThemeContext";
import { CartProvider } from "@/src/app/context/CartContext";
import { WishlistProvider } from '@/src/app/context/WishlistContext'; 
import Navbar from "@/src/app/components/layout/Navbar";
import BrandHeader from "@/src/app/components/layout/BrandHeader";
import Footer from "@/src/app/components/layout/Footer";
import SubscribeSection from "@/src/app/components/layout/SubscribeSection";



export const metadata = {
  title: "E-Commerce Store | Best Deals Online",
  description: "Shop the latest electronics, home interiors, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomThemeProvider>
          <CartProvider>
            <WishlistProvider>
            <BrandHeader />
            
            <Navbar />
            
            {children}
            
            <SubscribeSection />
            <Footer />
            </WishlistProvider>
          </CartProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}