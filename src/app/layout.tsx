'use client';

import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Provider from "@/redux/provider";
import Setup from "@/components/utils/Setup";
const inter = Inter({ subsets: ["latin"] });
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/auth/login-register';

  return (
    <html lang="en">
      <body>
        <Provider>
          <Setup />
          {!isAuthPage && <Header />}
          {children}
          {!isAuthPage && <Footer />}
          
        </Provider>
      </body>
    </html>
  );
}
