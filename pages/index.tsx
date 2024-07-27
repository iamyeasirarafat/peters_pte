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
            src="/logo.png"
            fill
            alt="brand logos"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
