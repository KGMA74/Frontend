import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Provider from "@/redux/provider";
import Setup from "@/components/utils/Setup";
import ScreenIndicator from "@/utils/ScreenIndicator";

const inter = Inter({ subsets: ["latin"] });
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: {
    template: 'ESIOverflow | %s',
    default: 'ESIOverflow'
  },
  description: 'created by AAA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Setup/>
          <Header/>
          {children}
          <Footer/>
          <ScreenIndicator />
        </Provider>
      </body>
    </html>
  )
}
