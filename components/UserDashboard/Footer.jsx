import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-primary w-full">
      <div className="container px-6 md:px-10 4xl:px-0 w-full mx-auto p-4">
        <div className="flex flex-col justify-center gap-4  h-full">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
            <Image
              className="w-36"
              src="/logo-white.png"
              alt="logo"
              height={300}
              width={300}
            />
            <div className="flex justify-between items-center gap-2">
              <button className="bg-[url('/images/appStore.png')] bg-contain h-[67px] w-[225px] cursor-pointer" />
              <button className="bg-[url('/images/googlePlay.png')] bg-contain h-[67px] w-[225px] cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center text-white text-[18px]">
            <ul className="flex gap-4 items-center ">
              <li>
                <a
                  target="_blank"
                  href="https://peterspte.com/#contactusfooter"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://peterspte.com/terms-conditions/"
                >
                  Terms & Condition
                </a>
              </li>
              <li>
                <a target="_blank" href="https://peterspte.com/privacy-policy/">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a target="_blank" href="https://pearsonpte.com/">
                  Pearson Official Website
                </a>
              </li>
            </ul>
            <p>All rights reserved © Peter’s PTE, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
