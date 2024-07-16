import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaRegPaperPlane } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";

const HelpAndsupport = () => {
  const [reviewText, setReviewText] = useState("");
  return (
    <div className="mb-20">
      <Toaster />
      <h2 className="text-4xl font-normal mb-3 capitalize">help & support</h2>
      <div className="flex flex-col md:flex-row gap-2 w-full justify-between ">
        {/* card  */}
        <div className="bg-[url('/images/getexpert.png')] bg-cover w-full min-h-[130px] flex flex-col justify-center items-start gap-2 rounded-[15px] px-5 py-7 ">
          <h3 className="text-4xl font-normal text-white capitalize">
            Get Expert Help
          </h3>
          <Link href="tel:+880 01711395841" className="flex gap-2 text-white items-center px-4 py-1 bg-[#4399FF] rounded-[30px] ">
            <FiPhoneCall className="h-5 w-5" />
            <span>+880 01711395841</span>
          </Link>
        </div>
        {/* card 2 */}
        <div className="bg-[url('/images/review.png')] bg-cover w-full min-h-[130px] flex flex-col justify-center items-start gap-2 rounded-[15px] px-5 py-7 ">
          <h3 className="text-4xl font-normal text-white capitalize">
            Write a Review
          </h3>
          <div className="w-full px-4 flex items-center rounded-[30px]  overflow-hidden bg-white text-[#CF8800] border border-[#CF8800]">
            <input
              type="text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-[100%] border-0 focus:outline-none focus:ring-0"
              placeholder="Write Your Review"
            />
            <FaRegPaperPlane
              onClick={async () => {
                if (reviewText) {
                  try {
                    await axios.post("/student_review", { body: reviewText });
                    setReviewText("");
                    toast.success("Review Submitted Successfully");
                  }
                  catch (error) {
                    toast.error("Something went wrong");
                  }
                }
              }}
              className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndsupport;
