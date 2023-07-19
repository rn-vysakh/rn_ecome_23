import "./globals.css";
import { Inter } from "next/font/google";
import MainHeader from "@/app/components/header/mainHeader";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rookie Ninja",
  description: "Products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
