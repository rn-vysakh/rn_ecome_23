import "./globals.css";
import { Open_Sans } from "next/font/google";
import MainHeader from "@/app/components/header/mainHeader";
const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Rookie Ninja",
  description: "Products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.className} overflow-x-hidden`}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
