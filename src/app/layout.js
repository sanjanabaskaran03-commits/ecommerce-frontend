import "./globals.css";

import ThemeRegistry from "@/src/app/components/theme/ThemeRegistry";
import { CustomThemeProvider } from "@/src/app/context/ThemeContext";
import { CartProvider } from "@/src/app/context/CartContext";
import { WishlistProvider } from '@/src/app/context/WishlistContext';
import ConditionalLayout from "@/src/app/components/layout/ConditionalLayout";

export const metadata = {
  title: "E-Commerce Store | Best Deals Online",
  description: "Shop the latest electronics, home interiors, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <CustomThemeProvider>
            <CartProvider>
              <WishlistProvider>
                <ConditionalLayout>
                  {children}
                </ConditionalLayout>
              </WishlistProvider>
            </CartProvider>
          </CustomThemeProvider>
        </ThemeRegistry>
      </body>
    </html>
  )}
