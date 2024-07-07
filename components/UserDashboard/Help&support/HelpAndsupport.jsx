import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FaRegPaperPlane } from "react-icons/fa6";

const HelpAndsupport = () => {
  return (
    <div className="mb-20">
      <h2 className="text-4xl font-normal mb-3 capitalize">help & support</h2>
      <div className="flex flex-col md:flex-row gap-2 w-full justify-between ">
        {/* card  */}
        <div className="bg-[url('/images/getexpert.png')] bg-cover w-full min-h-[130px] flex flex-col justify-center items-start gap-2 rounded-[15px] px-5 py-7 ">
          <h3 className="text-4xl font-normal text-white capitalize">
            Get Expert Help
          </h3>
          <button className="flex gap-2 text-white items-center px-4 py-1 bg-[#4399FF] rounded-[30px] ">
            <FiPhoneCall className="h-5 w-5" />
            <span>+880 01711395841</span>
          </button>
        </div>
        {/* card 2 */}
        <div className="bg-[url('/images/review.png')] bg-cover w-full min-h-[130px] flex flex-col justify-center items-start gap-2 rounded-[15px] px-5 py-7 ">
          <h3 className="text-4xl font-normal text-white capitalize">
            Write a Review
          </h3>
          <div className="w-full px-4 flex items-center rounded-[30px]  overflow-hidden bg-white text-[#CF8800] border border-[#CF8800]">
            <input
              className="w-[100%] border-0 focus:outline-none focus:ring-0"
              placeholder="Write Your Review"
            />
            <FaRegPaperPlane className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndsupport;
