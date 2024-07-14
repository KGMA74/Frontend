'use client';
import { useAppDispatch } from "@/redux/hooks";
import { logoutUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";

const Page = () => {
  useAppDispatch()(logoutUser()); //the user is logout
  return useRouter().push('/'); // return home
};

export default Page;
