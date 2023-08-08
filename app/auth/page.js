"use client";
import AuthBanner from "@/src/components/auth/AuthBanner";
import AuthHeader from "@/src/components/auth/AuthHeader";
import JoinForm from "@/src/components/auth/JoinForm";
import LoginForm from "@/src/components/auth/LoginForm";
import SocialLogin from "@/src/components/auth/SocialLogin";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
const Auth = () => {
  const [page, setPage] = useState("join");
  // const router = useRouter();
  // useEffect(() => {
  //   const accessToken = getCookie("access_token");
  //   const refreshToken = getCookie("refresh_token");
  //   if (accessToken || refreshToken) {
  //     router.push("/app");
  //   }
  // }, [router]);
  return (
    <div className="flex h-screen">
      <Toaster />
      {/* left side of joining page */}
      <AuthBanner />
      {/* right side joining forms */}
      <div className="w-full xl:w-1/2 flex flex-col items-center px-7 lg:px-12 2xl:px-[150px] justify-center">
        {/* logo and slogan */}
        <AuthHeader page={page} setPage={setPage} />
        {/* Join form */}
        {page === "join" ? <JoinForm setPage={setPage} /> : <LoginForm />}
        {/* social login */}
        <SocialLogin />
      </div>
    </div>
  );
};
export default Auth;
