import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Provider from "@/redux/provider";
import ScreenIndicator from "@/utils/ScreenIndicator";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'ESIOverflow',
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
          <Header/>
          {children}
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}
