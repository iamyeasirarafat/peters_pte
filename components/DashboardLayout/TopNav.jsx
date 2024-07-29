"use client";
import { toggleTopNav as toggleNav } from "@/redux/slice/layoutSlice";
import { Logout } from "@/utils/Logout";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { RiCloseCircleLine, RiMenu2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { navItems } from "./SideNav";

const TopNav = ({ dashboard }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { topNav, sideNav } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const toggleTopNav = () => {
    dispatch(toggleNav());
  };
  return (
    <div
      className={`${topNav ? "" : "-mt-16"
        } transition-all shadow-[0px_-5px_25px_2px_rgba(0,0,0,0.25)] bg-white duration-300 ease-linear z-50 relative`}
    >
      <div className=" h-16 w-full p-1.5 container mx-auto flex items-center justify-between px-6 md:px-10 4xl:px-0">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="block lg:hidden"
        >
          <RiMenu2Line className="text-primary text-4xl" />
        </button>
        <Logo />
        <MenuItem />
        <UserDropdown />
      </div>
      {topNav && (
        <button
          onClick={toggleTopNav}
          className="hidden lg:block absolute bg-white top-6 right-4"
        >
          <IoIosArrowUp className="text-xl" />
        </button>
      )}
      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </div>
  );
};

export default TopNav;

//-------- Logo---------//

const Logo = () => {
  return (
    <div className="relative w-36 h-full">
      <Link href={"/app"}>
        <Image src="/pte_logo.png" fill alt="logo" />
      </Link>
    </div>
  );
};

const MenuItem = () => {
  const menuData = navItems;
  return (
    <ul className="text-gray hidden lg:flex items-center gap-8 text-xl  font-avantt">
      <li>
        <Link className="text-base md:text-lg xl:text-xl" href="/app">
          Home
        </Link>
      </li>
      <li className="group flex items-center gap-x-2 cursor-pointer">
        Practice Test <IoIosArrowDown className="text-sm text-gray" />
        {/*
        -------------- mega menu ---------------*/}
        <div
          className={`absolute z-50 top-11 left-0 w-full overflow-hidden group-hover:shadow-md transition-all duration-500 group-hover:h-[430px] h-0 cursor-default`}
        >
          <div className="pt-5 bg-white h-full w-full mt-5">
            <div className="w-full container mx-auto flex justify-between gap-x-3">
              {Object.keys(menuData).map((item, index) => {
                const itemColor = item.includes("Speaking")
                  ? "#FF8D29"
                  : item.includes("Writing")
                    ? "#2D46B9"
                    : item.includes("Reading")
                      ? "#3EC70B"
                      : "#00B4D8";
                return (
                  <div key={index} className="w-full">
                    <h3
                      style={{
                        color: itemColor,
                        borderColor: itemColor,
                      }}
                      className=" text-xl border-b mr-10 leading-10 w-full"
                    >
                      {item}
                    </h3>
                    <div className="space-y-2 mt-3">
                      {menuData?.[item]?.map((test, index) => {
                        return (
                          <Link
                            key={index}
                            href={test?.path}
                            className="flex gap-x-2  items-center"
                          >
                            {/* <div className="relative h-14 w-14 flex-shrink-0">
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
                            </div> */}
                            <h2 className="font-cabin hover:text-primary  duration-300 text-base leading-tight text-gray">
                              {test?.name}{" "}
                              <span
                                style={{
                                  color: itemColor,
                                }}
                                className="text-sm font-semibold font-avantt"
                              >
                                {test.icon}
                              </span>
                            </h2>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* study material  */}
            <div className="container mx-auto">
              <div className="flex max-w-3xl flex-col">
                <h1 className="text-primary border-b pb-2 mb-4 border-primary">
                  Study Tools
                </h1>
                <div className="flex  justify-between">
                  <Link href="/app/study-material">Study Materials</Link>
                  <Link href="/app/template">Templates</Link>
                  <Link href="/app/prediction">Predictions</Link>
                  <Link href="#">Marking</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <Link
          className="text-base md:text-lg xl:text-xl"
          href="/app/practice/mock_test"
        >
          Mock Test
        </Link>
      </li>
      {/* <li>
        <Link className="text-base md:text-lg xl:text-xl" href="/contact">
          Prediction
        </Link>
      </li> */}
      <li>
        <Link className="text-base md:text-lg xl:text-xl" href="/contact">
          Mobile App
        </Link>
      </li>
    </ul>
  );
};

const UserDropdown = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { user } = useSelector((state) => state?.user);
  return (
    <div className="flex items-center gap-2 relative">
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="rounded-full overflow-hidden text-4xl  w-12 h-12 text-white bg-primary capitalize flex items-center justify-center"
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
      <button className="bg-oldPrimary hidden md:flex text-sm md:text-base xl:text-lg text-white font-avantt font-semibold items-center py-2 px-3 xl:py-3 xl:px-5 rounded-[32px] gap-1">
        <span>Premium</span>
        <Image
          className="object-cover"
          src="/icons/diamond.svg"
          width={24}
          height={24}
          alt="icon"
        />
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
              <p className="text-gray text-base whitespace-nowrap">
                {user?.email}
              </p>
            </div>
          </div>
          <hr className="border-t border-gray" />
          <div className="py-2 px-7">
            <button className="text-gray hover:scale-105 duration-200 hover:text-stone-600 text-lg font-medium flex items-center px-3 py-1 gap-x-2">
              Premium
              <Image
                className="object-cover"
                src="/icons/diamond_black.svg"
                width={24}
                height={24}
                alt="icon"
              />
            </button>
            <Link
              href="/app/profile"
              className="text-gray hover:scale-105 duration-200 hover:text-stone-600 text-lg font-medium flex items-center px-3 py-1 gap-x-2"
            >
              Profile Center <FiUser className="text-xl" />
            </Link>
            <button
              onClick={() => Logout()}
              className="text-gray hover:scale-105 duration-200 hover:text-stone-600 text-lg font-medium flex items-center px-3 py-1 gap-x-2"
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
  const [practiceMenu, setPracticeMenu] = useState(false);

  return (
    <div
      className={`w-[250px] h-screen bg-secondary absolute top-0  ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } z-50 pt-12 transition-transform duration-500 ease-in-out`}
    >
      <RiCloseCircleLine
        onClick={() => {
          setMobileMenuOpen(false);
          setPracticeMenu(false);
        }}
        className="text-red duration-200 cursor-pointer text-3xl absolute top-2 right-2"
      />
      <ul className="text-white flex flex-col gap-3 text-xl font-semibold font-avantt px-4">
        <Link
          href="/app"
          className="text-white py-2 px-3 bg-primary rounded-md"
        >
          Home
        </Link>
        <div className="">
          <div
            onClick={() => setPracticeMenu(!practiceMenu)}
            className="bg-primary text-white py-2 px-3 rounded-md flex items-center justify-between"
          >
            <div>
              <h1>Practice Test</h1>
            </div>
            <IoIosArrowDown
              className={
                practiceMenu ? "rotate-180 duration-200" : "duration-200"
              }
            />
          </div>
          {practiceMenu && <PracticeTest />}
        </div>
        <Link
          className="text-white py-2 px-3 bg-primary rounded-md"
          href="/app/practice/mock_test"
        >
          Mock Test
        </Link>
        <Link
          className="text-white py-2 px-3 bg-primary rounded-md"
          href="/app/prediction"
        >
          Prediction
        </Link>
        <Link
          className="text-white py-2 px-3 bg-primary rounded-md"
          href="/contact"
        >
          Mobile App
        </Link>
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

function PracticeTest() {
  const [isCollapsOpen, setIsCollapsOpen] = useState(null);
  const menuData = navItems;

  return (
    <div className="mt-3 space-y-1.5 pl-4">
      {Object.keys(menuData).map((item, index) => (
        <div key={index}>
          <div
            onClick={() =>
              setIsCollapsOpen(isCollapsOpen === null ? item : null)
            }
            className="flex items-center justify-between  bg-primary rounded-md px-2"
          >
            <h2 className="text-white py-1 px-3" key={index}>
              {item}
            </h2>
            <IoIosArrowDown
              className={
                isCollapsOpen === item
                  ? "rotate-180 duration-200"
                  : "duration-200 text-white"
              }
            />
          </div>
          {isCollapsOpen === item && (
            <div className="pl-3 mt-2">
              {menuData[item]?.map((test, index) => (
                <Menu test={test} key={index} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const Menu = ({ test }) => {
  return (
    <Link
      href={test?.path}
      className="text-lg text-secondary font-thin block bg-primary px-3 mt-1 rounded "
    >
      {test?.name}
    </Link>
  );
};
