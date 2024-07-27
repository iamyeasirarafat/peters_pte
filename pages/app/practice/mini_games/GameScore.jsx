import React from "react";

function GameScore({ data }) {
  return (
    <div className="mt-5 md:mt-15 flex flex-col md:flex-row items-center gap-y-3 gap-x-5">
      <div className="w-full py-3 px-5 bg-white text-center rounded-lg">
        <p className="text-lg font-semibold">Your Current Score</p>
        <p className="text-5xl font-semibold">{data?.current}</p>
      </div>
      <div className="w-full py-3 px-5 bg-blue text-white text-center rounded-lg">
        <p className="text-lg font-semibold">Your Highest Score</p>
        <p className="text-5xl font-semibold">{data?.max}</p>
      </div>
    </div>
  );
}

export default GameScore;
