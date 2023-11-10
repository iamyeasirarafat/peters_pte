import auth from "@/utils/firebaseinit";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useSignInWithApple,
  useSignInWithFacebook,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { AiFillApple } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithApple, appleUser, appleLoading, appleError] =
    useSignInWithApple(auth);
  const [signInWithFacebook, facebookUser, facebookLoading, facebookError] =
    useSignInWithFacebook(auth);
  const [authProvider, setAuthProvider] = useState("")
  const router = useRouter()
  useEffect(() => {
    if (googleUser || appleUser || facebookUser) {

      //destructuring data from different auth provider
      const { user } = googleUser || appleUser || facebookUser || {}
      const FinalData = {
        uid: user.uid,
        full_name: user.displayName,
        email: user.email,
        image_url: user.photoURL,
        provider: authProvider
      }

      // submitting Data to api
      const submitData = async () => {
        try {
          const res = await axios.post("/auth/user/social/join", FinalData)

          if (res?.data?.access) {
            setCookie("access_token", res?.data?.access, { maxAge: 60 * 60 });
          }
          if (res?.data?.refresh) {
            setCookie("refresh_token", res?.data?.refresh, {
              maxAge: 60 * 60 * 24,
            });
          }
          router.push("/app");
        } catch (e) {

          toast.error("Something went wrong")
        }
      }
      user && submitData()

    } else if (googleError || appleError || facebookError) {
      toast.error("Cant logged in by" + googleError ? "google" : facebookError ? "Facebook" : appleError ? "apple" : "...")
    }
  }, [appleError, appleUser, authProvider, facebookError, facebookUser, googleError, googleUser])
  return (
    <>
      <p className="text-sm text-[#616161] mt-2 text-center">
        By clicking JOIN NOW, you are agreeing to the T&C sand Privacy Policy
      </p>
      <p className="text-base text-[#616161] mt-5 text-center">
        Or continue with
      </p>
      <div className="flex items-center justify-center gap-x-3 mt-3">
        <button onClick={() => {
          signInWithFacebook()
          setAuthProvider("facebook")
        }} className="py-3 px-10 rounded-[22px] bg-[#4399ff]">
          <FaFacebookF className="text-white text-[40px]" />
        </button>
        <button
          onClick={() => {
            signInWithGoogle()
            setAuthProvider("google")
          }}
          className="py-3 px-10 rounded-[22px] border border-[#B9B9B9]"
        >
          <FcGoogle className="text-[40px]" />
        </button>
        <button
          onClick={() => {
            signInWithApple()
            setAuthProvider("apple")
          }}
          className="py-3 px-10 rounded-[22px] bg-black"
        >
          <AiFillApple className="text-white text-[40px]" />
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
