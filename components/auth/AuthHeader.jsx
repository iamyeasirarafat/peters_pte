import Image from "next/image";
import { useEffect, useState } from "react";

export default function AuthHeader({ page, setPage }) {
  const [screenWidth, setScreenWidth] = useState();

  useEffect(() => {
    setScreenWidth(window?.innerWidth);
  }, []);

  const handleResize = () => {
    const width = window?.innerWidth;
    setScreenWidth(width);
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {/* site logo */}
      <div className="w-[205px] h-[72px] lg:w-[305px] lg:h-[107px]">
        <div className="w-full h-full relative">
          <Image
            className="object-cover"
            src="/site-logo.png"
            fill
            alt="auth image"
          />
        </div>
      </div>
      {/* login heading */}
      <h1 className="text-3xl xl:text-6xl font-semibold uppercase mt-4">
        THE MOST ACCURATE
      </h1>
      <h2 className="text-2xl xl:text-4xl font-semibold mt-2 text-center">
        PTE Mock Test & Practice{" "}
      </h2>
      {/* login and signup toggle button */}
      <div className="w-full bg-[#FFF4EB] rounded-[32px] flex items-center justify-between py-2 px-4 my-4">
        <button
          onClick={() => setPage("login")}
          className={`${
            page === "login"
              ? "py-6 px-14 rounded-[22px] text-white bg-[#4399FF]"
              : "py-6 px-14 rounded-[22px] text-black bg-transparent"
          } duration-300`}
        >
          {screenWidth >= 1023 ? "I am already a USER" : "Login"}
        </button>
        <button
          onClick={() => setPage("join")}
          className={`${
            page === "join"
              ? "py-6 px-14 rounded-[22px] text-white bg-[#4399FF]"
              : "py-6 px-14 rounded-[22px] text-black bg-transparent"
          } duration-300`}
        >
          {screenWidth >= 1023 ? "I am NEW to PETER’S PTE" : "Sign Up"}
        </button>
      </div>
    </>
  );
}
