"use client";

import { usePathname } from "next/navigation";
//import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Provider from "@/redux/provider";
import Setup from "@/components/utils/Setup";
import "react-toastify/dist/ReactToastify.css";

import {
    HomeIcon,
    TagIcon,
    UserIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/solid"; // Heroicons import
import Link from "next/link"; // Importer Link pour la navigation
import { UserProvider } from "@/components/UserProvider";

//const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/auth/login-register";

    return (
        <Provider>
            <html lang="en">
                <body
                    className={`${'inter.className'} min-h-screen flex flex-col`}
                >
                    <Setup />

                    {/* Header */}
                    {!isAuthPage && <Header />}

                    {/* Main layout container */}
                    <div className="flex flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                        {/* Left sidebar (with icons) */}
                        {!isAuthPage && (
                            <aside className="w-1/4 hidden md:block bg-gray-50 p-4 h-screen sticky top-0 border-r">
                                <nav>
                                    <ul className="space-y-4">
                                        <li>
                                            <Link
                                                href="/"
                                                className="flex items-center text-gray-900 font-semibold hover:text-blue-600"
                                            >
                                                <HomeIcon className="w-6 h-6 mr-2 text-gray-500" />
                                                Home
                                            </Link>
                                        </li>
                                        
                                        <li>
                                            <Link
                                                href="/tags"
                                                className="flex items-center text-gray-600 hover:text-blue-600"
                                            >
                                                <TagIcon className="w-6 h-6 mr-2 text-gray-500" />
                                                Tags
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/users-profile"
                                                className="flex items-center text-gray-600 hover:text-blue-600"
                                            >
                                                <UserIcon className="w-6 h-6 mr-2 text-gray-500" />
                                                Users
                                            </Link>
                                        </li>
                                        
                                        
                                        <li>
                                        <UserProvider/>
                                        </li>
                                    </ul>
                                </nav>
                            </aside>
                        )}

                        {/* Main content area */}
                        <main className="flex-grow bg-white p-6 shadow-sm rounded-md overflow-y-auto">
                            {children}
                        </main>

                    </div>

                    {/* Footer */}
                    {!isAuthPage && <Footer />}
                </body>
            </html>
        </Provider>
    );
}
