import React from "react";
import { AiOutlineSound } from "react-icons/ai";
import { ImPlay3 } from "react-icons/im";

const ListenBlock = () => {
  return (
    <div className="p-5 border border-primary rounded-[15px]">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-y-2">
          <button className="bg-primary rounded-full w-16 h-16 flex items-center justify-center">
            <ImPlay3 className="text-white text-4xl" />
          </button>
          <p className="text-gray text-lg">CLICK TO LISTEN</p>
          <div className="flex items-center gap-x-5">
            <select className="bg-secondary rounded-[22px] py-1 pl-4 pr-10 focus:border-none focus:ring-0 border-none text-gray text-base">
              <option value="0.8x">0.8x</option>
              <option value="1.0x">1.0x</option>
              <option value="1.2x">1.2x</option>
              <option value="2.0x">2.0x</option>
            </select>
            {/* sound volume */}
            <div className="flex items-center gap-x-2">
              <AiOutlineSound className="text-xl text-primary" />
              <input
                className="appearance-none h-2 bg-primary text-secondary rounded-full"
                type="range"
              />
            </div>
          </div>
        </div>
      </div>
      {/* play */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-gray text-base">0:00</p>
          <p className="text-gray text-base">0:35</p>
        </div>
        <input
          className="appearance-none h-2 bg-primary text-secondary rounded-full w-full"
          type="range"
        />
      </div>
    </div>
  );
};

export default ListenBlock;
