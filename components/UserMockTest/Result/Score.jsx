import { GiProgression } from "react-icons/gi";
import { MdOutlineYoutubeSearchedFor } from "react-icons/md";
const Score = ({ setActiveTab }) => {
  return (
    <div className="py-5">
      <div className="relative w-3/5">
        <p className="text-xl font-semibold text-neutral-600 ">PTE Mock Test</p>
        <div className="absolute -top-2 right-40">
          <p className="text-slate-500 font-semibold">57 Overall</p>
          <div className="w-1 h-40 bg-slate-500"></div>
        </div>
        <div className="flex justify-center mb-5 gap-3">
          <div className="flex flex-col gap-2 justify-start items-end">
            <p className="text-sm text-neutral-600 h-7">Listening</p>
            <p className="text-sm text-neutral-600 h-7">Speaking</p>
            <p className="text-sm text-neutral-600 h-7">Reading</p>
            <p className="text-sm text-neutral-600 h-7">Writing</p>
          </div>
          <div className="flex flex-col gap-2 justify-start items-start">
            <p className="text-blue-700 font-semibold h-7">51</p>
            <p className="text-blue-700 font-semibold h-7">60</p>
            <p className="text-blue-700 font-semibold h-7">68</p>
            <p className="text-blue-700 font-semibold h-7">53</p>
          </div>
          <div className="flex flex-col gap-2 justify-start items-start">
            <div className="w-28 h-7 bg-blue"></div>
            <div className="w-36 h-7 bg-yellow-500"></div>
            <div className="w-44 h-7 bg-neutral-600"></div>
            <div className="w-32 h-7 bg-fuchsia-700"></div>
          </div>
        </div>
      </div>
      {/* button */}
      <div className="flex items-center justify-center gap-x-20">
        <button className="py-2 px-3 rounded-full text-white bg-primary flex items-center gap-x-2">
          <MdOutlineYoutubeSearchedFor /> Share Result
        </button>
        <button
          onClick={() => setActiveTab("speaking")}
          className="py-2 px-3 rounded-full text-white bg-primary flex items-center gap-x-2"
        >
          <GiProgression /> Check Score Analysis
        </button>
        <button className="py-2 px-3 rounded-full text-white bg-primary flex items-center gap-x-2">
          <GiProgression /> Report
        </button>
        <button className="py-2 px-3 rounded-full text-white bg-primary flex items-center gap-x-2">
          <GiProgression /> Score Overview
        </button>
      </div>
    </div>
  );
};
export default Score;
