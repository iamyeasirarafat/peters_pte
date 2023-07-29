"use client";
import { toggleTopNav as toggleNav } from "@/src/redux/slice/layoutSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const TopNav = () => {
  const { topNav } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const toggleTopNav = () => {
    dispatch(toggleNav());
  };
  return (
    <div
      className={`relative ${
        topNav ? "" : "-mt-16"
      } transition-all duration-300 ease-linear`}
    >
      <div className="h-16 bg-primary flex items-center p-1.5 justify-center ">
        <div className="w-full justify-between max-w-6xl h-full flex">
          <Logo />
          <MenuItem />
          <UserDropdown />
        </div>
      </div>
      <button onClick={toggleTopNav} className="absolute top-6 right-4">
        <img src="/icons/chevron-up.svg" />
      </button>
    </div>
  );
};

export default TopNav;

const Logo = () => {
  return (
    <div className="relative w-36 h-full">
      <Image src="/logo.png" fill alt="logo" />
    </div>
  );
};

const MenuItem = () => {
  return (
    <ul className="text-white flex items-center gap-4 text-xl font-semibold font-avantt">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">Practice Test</Link>
      </li>
      <li>
        <Link href="/about">Mock Test</Link>
      </li>
      <li>
        <Link href="/contact">Prediction</Link>
      </li>
      <li>
        <Link href="/contact">Mobile App</Link>
      </li>
    </ul>
  );
};

const UserDropdown = () => {
  return (
    <div className="flex gap-2">
      <button className="bg-gold flex text-lg text-white font-avantt font-semibold items-center py-3 px-5 rounded-[32px] gap-1">
        <span>Become Premium</span>
        <img src="/icons/diamond.svg" />
      </button>
      <button className="rounded-full text-4xl text-gray px-4 bg-white">
        T
      </button>
    </div>
  );
};
