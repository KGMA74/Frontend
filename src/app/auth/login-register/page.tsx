"use client"
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import LoginForm from "@/form/LoginForm";
import RegisterForm from "@/form/RegisterForm";


const Page = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form['email'].value;
    const password = form['password'].value;
    console.log(email, password);
   
    // envoi au niveau du backend
  };

  const registerSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const nickname = form['nickname'].value;
    const email = form['email'].value;
    const password = form['password'].value;
    const password2 = form['password2'].value;
    console.log(nickname, email, password);
   
    // envoi au niveau du backend
    await api.post('users/register/',{
      json: {
        nickname: nickname,
        email: email,
        password: password,
        password2: password2 
      }
    })
      .then(response => console.log(response))
      .catch(err => console.log("Erreur lors de la creation duser: ", err));
      setIsLogin(true);
  };

 

  return (
    <div className="flex w-full h-full justify-center items-center">
      {isLogin ? (
        <LoginForm submitHandler={submitHandler} NotSigned={() => setIsLogin(false)}/>
      ) : (
        <RegisterForm submitHandler={registerSubmitHandler} AlreadySigned={() => setIsLogin(true)}/>
      )}
    </div>
  );
};

export default Page;
