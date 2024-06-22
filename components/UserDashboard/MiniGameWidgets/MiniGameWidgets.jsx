import React from "react";
import WhiteBGButton from "../Buttons/WhiteBGButton";
import { useRouter } from "next/router";

const MiniGameWidgets = () => {
  const router = useRouter();
  return (
    <div className="mb-20">
      <h2 className="text-xl md:text-2xl lg:text-4xl font-normal mb-3">
        Mini Game - Play & Win
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full">
        {/* card 1 */}
        <div className="bg-[url('/images/spelling_bee.png')] bg-cover w-full min-h-[130px] flex flex-col justify-center items-start gap-2 rounded-[15px] px-5 py-3 ">
          <h3 className="text-4xl font-normal text-white capitalize">
            Spelling BEE
          </h3>
          <WhiteBGButton
            handelClick={() =>
              router.push(`/app/practice/mini_games/spelling_bee`)
            }
            title="Start Playing"
          />
        </div>
        {/* card 2 */}
        <div className="bg-[url('/images/listening.png')] bg-cover w-full min-h-[130px] flex flex-col justify-center items-start gap-2 rounded-[15px] px-5 py-3">
          <div className="text-white">
            <h3 className="text-4xl font-normal  capitalize">Listening</h3>
            <p className="text-lg font-normal  uppercase">FRENZY</p>
          </div>
          <WhiteBGButton
            handelClick={() =>
              router.push(`/app/practice/mini_games/listening_frenzy`)
            }
            title="Start Playing"
          />
        </div>
        {/* card 3 */}
        <div className="bg-[url('/images/speaking.png')] bg-cover w-full min-h-[130px] flex flex-col justify-center items-start gap-2 rounded-[15px] px-5 py-3">
          <div className="text-white">
            <h3 className="text-4xl font-normal  capitalize">Speaking</h3>
            <p className="text-lg font-normal  uppercase">SPELL</p>
          </div>
          <WhiteBGButton
            handelClick={() =>
              router.push(`/app/practice/mini_games/speaking_spell`)
            }
            title="Start Playing"
          />
        </div>
      </div>
    </div>
  );
};

export default MiniGameWidgets;
