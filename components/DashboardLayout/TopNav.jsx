"use client";
import { toggleTopNav as toggleNav } from "@/redux/slice/layoutSlice";
import { Logout } from "@/utils/Logout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { RiCloseCircleLine, RiMenu2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { navItems } from "./SideNav";

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
            className="block md:hidden"
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
        className="hidden md:block absolute top-6 right-4"
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
  const menuData = navItems;
  return (
    <ul className="text-white hidden md:flex items-center gap-4 text-xl font-semibold font-avantt">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li className="group flex items-center gap-x-2 cursor-pointer">
        Practice Test <IoIosArrowDown className="text-sm text-white" />
        {/* mega menu */}
        <div
          className={`absolute z-50 top-11 left-0 w-full overflow-hidden group-hover:shadow-md transition-all duration-500 group-hover:h-[630px] h-0 cursor-default`}
        >
          <div className="pt-5 bg-white h-full w-full mt-5">
            <div className="max-w-6xl mx-auto flex justify-between gap-x-3">
              {/* Speaking Test */}
              {Object.keys(menuData).map((item, index) => {
                return (
                  <div key={index} className="w-full">
                    <h3 className="text-gray text-xl font-semibold border-b border-gray leading-10 w-full">
                      {item}
                    </h3>
                    <div className="space-y-2 mt-3">
                      {menuData?.[item]?.map((test, index) => {
                        return (
                          <Link
                            key={index}
                            href={test?.path}
                            className="flex gap-x-2 items-center"
                          >
                            <div className="relative h-14 w-14 flex-shrink-0">
                              <div
                                className={`bg-${test?.bg} rounded-xl w-full h-full flex items-center justify-center text-xl text-white font-semibold`}
                              >
                                {test?.icon}
                              </div>
                              {test?.ai && (
                                <div className="absolute h-5 w-5 flex items-center justify-center text-white -top-1 -right-1 bg-blue rounded-full text-xs font-cabin ">
                                  AI
                                </div>
                              )}
                            </div>
                            <h2 className="font-cabin text-lg leading-tight text-gray">
                              {test?.name}
                            </h2>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
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
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useSelector((state) => state?.user);
  return (
    <div className="flex gap-2 relative">
      <button className="bg-gold hidden md:flex text-lg text-white font-avantt font-semibold items-center py-3 px-5 rounded-[32px] gap-1">
        <span>Become Premium</span>
        <Image
          className="object-cover"
          src="/icons/diamond.svg"
          width={24}
          height={24}
          alt="icon"
        />
      </button>
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="rounded-full overflow-hidden text-4xl text-gray w-12 h-12 bg-white capitalize flex items-center justify-center"
      >
        {user?.picture ? (
          <Image
            src={user?.picture}
            width={1000}
            height={1000}
            alt="profile pic"
          />
        ) : (
          user?.full_name?.charAt(0)
        )}
      </button>

      {/* user info */}
      {showProfile && (
        <div className="absolute top-[110%] right-0 bg-white rounded-sm shadow z-50">
          <div className="px-4 py-3 flex items-center gap-x-4">
            <p className="rounded-full text-5xl text-gray w-14 h-14 bg-white capitalize flex items-center justify-center border border-primary">
              {user?.full_name?.charAt(0)}
            </p>
            <div className="space-y-1">
              <p className="text-gray text-base capitalize">
                {user?.full_name}
              </p>
              <p className="text-gray text-base">{user?.email}</p>
            </div>
          </div>
          <hr className="border-t border-gray" />
          <div className="py-2 px-7">
            <button className="text-gray text-lg font-medium flex items-center px-3 py-1 gap-x-2">
              Become Premium
              <Image
                className="object-cover"
                src="/icons/diamond_black.svg"
                width={24}
                height={24}
                alt="icon"
              />
            </button>
            <button className="text-gray text-lg font-medium flex items-center px-3 py-1 gap-x-2">
              Profile Center <FiUser className="text-xl" />
            </button>
            <button
              onClick={() => Logout()}
              className="text-gray text-lg font-medium flex items-center px-3 py-1 gap-x-2"
            >
              Log Out <MdLogout className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MobileMenu = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <div
      className={`w-[250px] h-full bg-secondary absolute top-0  ${
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } z-50 pt-14 transition-transform duration-500 ease-in-out`}
    >
      <RiCloseCircleLine
        onClick={() => setMobileMenuOpen(false)}
        className="text-primary text-3xl absolute top-2 right-2"
      />
      <ul className="text-white flex flex-col gap-4 text-xl font-semibold font-avantt px-6">
        <li className="text-gray py-2 px-3 bg-primary rounded-md">
          <Link href="/">Home</Link>
        </li>
        <li className="text-gray py-2 px-3 bg-primary rounded-md">
          <Link href="/about">Mock Test</Link>
        </li>
        <li className="text-gray py-2 px-3 bg-primary rounded-md">
          <Link href="/prediction">Prediction</Link>
        </li>
        <li className="text-gray py-2 px-3 bg-primary rounded-md">
          <Link href="/contact">Mobile App</Link>
        </li>
        <li>
          <button className="w-full bg-gold flex text-lg text-white font-avantt font-semibold items-center py-2 px-3 rounded-md gap-x-1">
            <span>Become Premium</span>
            <Image
              className="object-cover"
              src="/icons/diamond.svg"
              width={16}
              height={16}
              alt="icon"
            />
          </button>
        </li>
      </ul>
    </div>
  );
};
