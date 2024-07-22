import { useLoginMutation } from "@/redux/features/authApiSlice";
import { setAuth } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const useLogin = () => {
    const router = useRouter()
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const loginSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const email = form["email"].value;
        const password = form["password"].value;
        console.log(email, password);

        login({ email, password })
            .unwrap()
            .then(() => {
                toast.success("login success");
                dispatch(setAuth());
                router.push('/')
            })
            .catch(() => {
                toast.error("login failed");
            });

    };

    return {
        loginSubmit,
        isLoading,
    };
};

export default useLogin;