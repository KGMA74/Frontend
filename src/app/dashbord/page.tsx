'use client';

import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

const Page = () => {
    const { isAuthenticated } = useAppSelector(state => state.auth)
    const router = useRouter()
    return (
        <>
            { isAuthenticated ? (
                <main>
                    <h1>dashbord</h1>
                </main>
            ):(
                router.push('/auth/register-login')
            )}
        </>
    );
}

export default Page;