import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
    setTimeout(() => {
      router.push("/auth");
    }, 2000);
  }, [router]);
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-[200px] h-[200px] animate-pulse">
        <div className="w-full h-full relative">
          <Image
            className="object-contain"
            src="/site-logo.png"
            fill
            alt="auth image"
          />
        </div>
      </div>
      {/* <div className="flex items-center gap-x-4">
        <div className="flex justify-center items-center h-96">
          <div
            className="w-6 h-6 rounded-full animate-spin
                  border-x-4 border-solid border-orange-400 border-t-transparent"
          ></div>
        </div>
        <div className="flex items-center gap-x-1">Initializing</div>
      </div> */}
    </div>
  );
};

export default Home;
