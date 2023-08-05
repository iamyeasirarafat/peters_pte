import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthHeader() {
  const pathname = usePathname();
  return (
    <>
      {/* site logo */}
      <div className="w-[305px] h-[107px]">
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
      <h1 className="text-6xl font-semibold uppercase mt-4">
        THE MOST ACCURATE
      </h1>
      <h2 className="text-4xl font-semibold mt-2 text-center">
        PTE Mock Test & Practice{" "}
      </h2>
      {/* login and signup toggle button */}
      <div className="w-full bg-[#FFF4EB] rounded-[32px] flex items-center justify-between py-2 px-4 my-4">
        <Link
          href="/auth/login"
          className={`${
            pathname === "/auth/login"
              ? "py-6 px-14 rounded-[22px] text-white bg-[#4399FF]"
              : "py-6 px-14 rounded-[22px] text-black bg-transparent"
          } duration-300`}
        >
          I am already a USER
        </Link>
        <Link
          href="/auth/join"
          className={`${
            pathname === "/auth/join"
              ? "py-6 px-14 rounded-[22px] text-white bg-[#4399FF]"
              : "py-6 px-14 rounded-[22px] text-black bg-transparent"
          } duration-300`}
        >
          I am NEW to PETER’S PTE
        </Link>
      </div>
    </>
  );
}
