'use client';
import Link from "next/link";
import Logo from "@/components/Logo";
import { nav_links } from "@/Constants/constants";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

const isAuthenticated = false;

const Header = () =>  {
    const pathname = usePathname();
    console.log(useSearchParams())

    return (
    <header className="w-full flex items-center justify-between px-2 py-1">
        <Logo/>
        <div className="flex items-center">
        <nav className="hidden md:flex items-center my-2">
                {nav_links.map((link, index) => (
                    <Link href={link.url} 
                        key={index}
                        className="ml-3"
                    >
                            <li className={pathname!==link.url? "border-b-red-500 px-3 py-2 hover:border-b-2 hover:py-1  hover:text-red-500":
                                "border-b-red-500 px-3 border-b-2 py-1  text-red-500"
                            }>{link.name}</li>
                    </Link>
                ))}
            </nav>
            <div className="bg-red-500/95 ml-5 py-2 px-2 rounded-2xl">
                {isAuthenticated?
                    <p>logout</p>
                    :<Link href='/auth/login-register'>Login</Link>
                }
            </div>
       </div>
    </header>
    );
}

export default Header;