'use client';
import Link from "next/link";
import Logo from "@/components/Logo";
import { nav_links } from "@/Constants/constants";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import useLogout from "@/hooks/useLogout";
import Search from "@/components/Search"; // Assurez-vous que le chemin est correct

const Header = () => {
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const pathname = usePathname();
    const { onClickLogout, isLoading } = useLogout();

    const handleSearch = (query: string) => {
        // Logique de recherche ou navigation ici
        console.log('Recherche effectuée pour :', query);
    };

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-lg sticky top-0 z-50">
            <Link href="/" aria-label="Go to homepage">
                <Logo />
            </Link>
            <div className="flex-grow flex justify-center">
                <div className="w-full max-w-xl"> {/* Ajuste la largeur maximale de la barre de recherche */}
                    <Search onSearch={handleSearch} />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                {isAuthenticated && (
                    <>
                        <Link href="/contact" className="text-gray-700 hover:text-red-500">
                            Contact
                        </Link>
                        <Link href="/profile" className="bg-gray-200 text-gray-700 py-2 px-4 rounded-full transition-transform transform hover:scale-105">
                            AB
                        </Link>
                        <button 
                        onClick={onClickLogout} 
                        className="bg-red-500 text-white py-2 px-4 rounded-full transition-transform transform hover:scale-105 focus:outline-none"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging out..." : "Logout"}
                    </button>
                    </>
                )}
                
            </div>
        </header>
    );
}

export default Header;
