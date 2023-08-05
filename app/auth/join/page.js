"use client";
import AuthHeader from "@/src/components/auth/AuthHeader";
import JoinForm from "@/src/components/auth/JoinForm";
import AuthBanner from "@/src/components/auth/AuthBanner";
import SocialLogin from "@/src/components/auth/SocialLogin";
const Home = () => {
  return (
    <div className="flex h-screen">
      {/* left side of joining page */}
      <AuthBanner />
      {/* right side joining forms */}
      <div className="lg:w-1/2 flex flex-col items-center px-[150px] justify-center">
        {/* logo anh slogan */}
        <AuthHeader />
        {/* Join form */}
        <JoinForm />
        {/* social login */}
        <SocialLogin />
      </div>
    </div>
  );
};
export default Home;
