import auth from "@/src/utils/firebaseinit";
import React from "react";
import { AiFillApple } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  useSignInWithApple,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";

const SocialLogin = () => {
  const [signInWithGoogle, googleUser, loading, error] =
    useSignInWithGoogle(auth);
  const [signInWithApple, appleUser, appleLoading, appleError] =
    useSignInWithApple(auth);
  console.log(googleUser, "googleUser");
  return (
    <>
      <p className="text-sm text-[#616161] mt-2 text-center">
        By clicking JOIN NOW, you are agreeing to the T&C sand Privacy Policy
      </p>
      <p className="text-base text-[#616161] mt-5 text-center">
        Or continue with
      </p>
      <div className="flex items-center justify-center gap-x-3 mt-3">
        <button className="py-3 px-10 rounded-[22px] bg-[#4399ff]">
          <FaFacebookF className="text-white text-[40px]" />
        </button>
        <button
          onClick={() => signInWithGoogle()}
          className="py-3 px-10 rounded-[22px] border border-[#B9B9B9]"
        >
          <FcGoogle className="text-[40px]" />
        </button>
        <button
          onClick={() => signInWithApple()}
          className="py-3 px-10 rounded-[22px] bg-black"
        >
          <AiFillApple className="text-white text-[40px]" />
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
