"use client"
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import LoginForm from "@/components/form/LoginForm";
import RegisterForm from "@/components/form/RegisterForm";
import Logout from "../logout/page"
import { loginUser, logoutUser } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";


const Page = () => {
  const dispatch = useAppDispatch();
  const {isAuthenticated, error } = useAppSelector(state => state.auth)
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form['email'].value;
    const password = form['password'].value;
    console.log(email, password);
   
    // envoi au niveau du backend
    const response = await dispatch(loginUser({email, password}));
    console.log("errrrrrrr: ",error);
    //if(error) router.refresh()
    //else router.push('/');
  };

  const registerSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const nickname = form['nickname'].value;
    const email = form['email'].value;
    const password = form['password'].value;
    const re_password = form['re_password'].value;
    console.log(nickname, email, password);

    if(password!=re_password) {
      //register_error  = "password aren't the same"
    }
   
    // envoi au niveau du backend
    await api.post('users/',{
      json: {
        nickname: nickname,
        email: email,
        password: password,
        re_password: re_password 
      }
    })
      .then(response => console.log(response))
      .catch(err => console.log("Erreur lors de la creation duser: ", err));
      setIsLogin(true);
  };

 

  return (
    <div className="flex w-full h-full justify-center items-center">
      {isLogin ? (
        <LoginForm submitHandler={submitHandler} NotSigned={() => setIsLogin(false)} error={error} />
      ) : (
        <RegisterForm submitHandler={registerSubmitHandler} AlreadySigned={() => setIsLogin(true)}/>
      )}
    </div>
  );
};

export default Page;
