"use client";
import { toggleTopNav as toggleNav } from "@/src/redux/slice/layoutSlice";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RiCloseCircleLine, RiMenu2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { topNav } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const toggleTopNav = () => {
    dispatch(toggleNav());
  };
  return (
    <div
      className={`${
        topNav ? "" : "-mt-16"
      } transition-all duration-300 ease-linear`}
    >
      <div className="h-16 bg-primary flex items-center p-1.5 justify-center ">
        <div className="w-full justify-between items-center max-w-6xl h-full flex">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="xs:block md:hidden"
          >
            <RiMenu2Line className="text-white text-4xl" />
          </button>
          <Logo />
          <MenuItem />
          <UserDropdown />
        </div>
      </div>
      <button
        onClick={toggleTopNav}
        className="xs:hidden md:block absolute top-6 right-4"
      >
        <Image
          className="object-cover"
          src="/icons/chevron-up.svg"
          width={16}
          height={16}
          alt="icon"
        />
      </button>
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
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
    <ul className="text-white xs:hidden md:flex items-center gap-4 text-xl font-semibold font-avantt">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li className="flex items-center gap-x-2">
        Practice Test <IoIosArrowDown className="text-sm text-white" />
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
      <button className="bg-gold xs:hidden md:flex text-lg text-white font-avantt font-semibold items-center py-3 px-5 rounded-[32px] gap-1">
        <span>Become Premium</span>
        <Image
          className="object-cover"
          src="/icons/diamond.svg"
          width={24}
          height={24}
          alt="icon"
        />
      </button>
      <button className="rounded-full text-4xl text-gray w-12 h-12 bg-white">
        T
      </button>
    </div>
  );
};

const MobileMenu = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <div
      className={`w-[250px] h-full bg-primary absolute top-0  ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } z-50 pt-10 transition-transform duration-500 ease-in-out`}
    >
      <RiCloseCircleLine
        onClick={() => setMobileMenuOpen(false)}
        className="text-white text-3xl absolute top-2 right-2"
      />
      <ul className="text-white flex flex-col gap-4 text-xl font-semibold font-avantt px-6">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li className="flex items-center gap-x-2">
          Practice Test <IoIosArrowDown className="text-sm text-white" />
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
    </div>
  );
};
