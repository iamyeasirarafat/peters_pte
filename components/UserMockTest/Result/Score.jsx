import { GiProgression } from "react-icons/gi";
import { PiShareThin } from "react-icons/pi";
const Score = ({ setActiveTab, scoreReportTa, data }) => {
  console.log("data", data);
  return (
    <div className="py-5">
      <div className="w-full flex gap-x-5 py-7">
        <p className="text-xl font-semibold text-neutral-600 ">PTE Mock Test</p>
        {/* score */}
        <div className="flex justify-center mb-5 gap-3 w-1/3">
          {/* score title */}
          <div className="flex flex-col gap-2 justify-start items-end">
            <p className="text-sm text-neutral-600 h-7">Listening</p>
            <p className="text-sm text-neutral-600 h-7">Speaking</p>
            <p className="text-sm text-neutral-600 h-7">Reading</p>
            <p className="text-sm text-neutral-600 h-7">Writing</p>
          </div>
          {/* score number */}
          <div className="flex flex-col gap-2 justify-start items-start">
            <p className="text-blue-700 font-semibold h-7">
              {data?.score?.listening}
            </p>
            <p className="text-blue-700 font-semibold h-7">
              {data?.score?.speaking}
            </p>
            <p className="text-blue-700 font-semibold h-7">
              {data?.score?.reading}
            </p>
            <p className="text-blue-700 font-semibold h-7">
              {data?.score?.writting}
            </p>
          </div>
          {/* score bar */}

          <div className="relative w-full space-y-2 ">
            <div className="w-full relative h-7">
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: `${data?.score?.listening}%`,
                  height: "100%",
                  backgroundColor: "#4399FF",
                }}
              />
            </div>
            <div className="w-full relative h-7">
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: `${data?.score?.speaking}%`,
                  height: "100%",
                  backgroundColor: "#7DD8FF",
                }}
              />
            </div>
            <div className="w-full relative h-7">
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: `${data?.score?.reading}%`,
                  height: "100%",
                  backgroundColor: "#F2B277",
                }}
              />
            </div>
            <div className="w-full relative h-7">
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: `${data?.score?.writting}%`,
                  height: "100%",
                  backgroundColor: "#616161",
                }}
              />
            </div>
            {/* overall */}
            <div
              style={{
                position: "absolute",
                left: `${data?.score?.overall}%`,
                top: "-40px",
              }}
            >
              <p className="text-slate-500 font-semibold whitespace-nowrap">
                {data?.score?.overall} Overall
              </p>
              <div className="w-1 h-40 bg-slate-500"></div>
            </div>
          </div>
        </div>
      </div>
      {/* button */}
      <div className="flex items-center justify-center gap-x-20">
        <button className="py-2 px-3 rounded-full text-white bg-primary flex items-center gap-x-2">
          <PiShareThin /> Share Result
        </button>
        <button
          onClick={() => setActiveTab(scoreReportTa[1])}
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
