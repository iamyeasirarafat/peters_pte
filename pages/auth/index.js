import AuthBanner from "@/components/auth/AuthBanner";
import AuthHeader from "@/components/auth/AuthHeader";
import JoinForm from "@/components/auth/JoinForm";
import LoginForm from "@/components/auth/LoginForm";
import SocialLogin from "@/components/auth/SocialLogin";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
const Auth = () => {
  const [page, setPage] = useState("join");
  return (
    <div className="flex h-screen">
      <Toaster />
      {/* left side of joining page */}
      <AuthBanner />
      {/* right side joining forms */}
      <div className="xl:w-full w-1/2 flex flex-col items-center px-7 2xl:px-12 lg:px-[150px] justify-center">
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
