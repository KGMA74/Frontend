import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isLoading, isAuthenticated } = useAppSelector(
        (state) => state.auth
    );

    
    if (isLoading) {
        return (
            <div className="flex justify-center my-8">
                {/*<Spinner lg />*/}
                Spinner
            </div>
        );
    }


    if (!isAuthenticated) {
        redirect("/auth/login-register");
    }

    return <>{children}</>;
};

export default RequireAuth;
