"use client";
import AuthHeader from "@/src/components/auth/AuthHeader";
import LoginForm from "@/src/components/auth/LoginForm";
import AuthBanner from "@/src/components/auth/AuthBanner";
import SocialLogin from "@/src/components/auth/SocialLogin";
const Home = () => {
  return (
    <div className="flex h-screen">
      {/* left side of auth page */}
      <AuthBanner />
      {/* right side auth forms */}
      <div className="w-1/2 flex flex-col items-center px-[150px] justify-center">
        {/* banner */}
        <AuthHeader />
        {/* Join form */}
        <LoginForm />
        {/* social login */}
        <SocialLogin />
      </div>
    </div>
  );
};
export default Home;
