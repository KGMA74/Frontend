'use client';

import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Provider from "@/redux/provider";
import Setup from "@/components/utils/Setup";
import ScreenIndicator from "@/utils/ScreenIndicator";
import { metadata } from './metadata';
const inter = Inter({ subsets: ["latin"] });
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth/login' || pathname === '/auth/register';

  return (
    <html lang="en">
      <body>
        <Provider>
          <Setup />
          {!isAuthPage && <Header />}
          {children}
          {!isAuthPage && <Footer />}
          <ScreenIndicator />
        </Provider>
      </body>
    </html>
  );
}
