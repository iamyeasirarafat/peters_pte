import React from "react";
import Pagination from "../global/Pagination";

const TypingBlock = () => {
  return (
    <>
      <div className="border border-primary rounded-[15px] mt-3 ml-8 mr-5">
        <div className="flex items-center justify-end bg-primary rounded-t-[15px] p-1 px-5">
          <div className="w-1/2 flex items-center justify-between">
            <p className="text-gray text-xs text-center mr-auto">
              <i>Time Remaining 08:57</i>
            </p>
            <p className="text-gray text-xs text-center">Word Count: 0</p>
          </div>
        </div>
        <div className="p-3">
          <textarea
            className="w-full border-0 text-gray focus:ring-0"
            placeholder="Type your summary here..."
            rows={4}
          ></textarea>
        </div>
      </div>
      {/* pagination */}
      <Pagination />
    </>
  );
};

export default TypingBlock;
