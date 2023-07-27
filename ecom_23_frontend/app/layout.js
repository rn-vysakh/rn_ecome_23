import "./globals.css";
import { Open_Sans } from "next/font/google";
import MainHeader from "@/app/components/header";
import Footer from "@/app/components/footer/footer";
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
        <Footer />
      </body>
    </html>
  );
}
