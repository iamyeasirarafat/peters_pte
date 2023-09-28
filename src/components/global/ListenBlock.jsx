import { Howl } from "howler";
import { useState } from "react";
import { ImPlay3 } from "react-icons/im";
import { MdOutlinePause } from "react-icons/md";
const ListenBlock = ({ setOpen, data }) => {
  console.log(data);
  const [isPlaying, setIsPlaying] = useState(false);
  // Create an instance of Howl with your audio file URL
  const sound = new Howl({
    src: [data?.audio], // Replace with the correct audio file URL
  });

  const toggleAudio = () => {
    if (isPlaying) {
      sound.stop();
    } else {
      sound.play();
    }
    setIsPlaying(!isPlaying);
  };
  return (
    <div className="p-5 border border-primary rounded-[15px] relative">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center gap-y-2">
          <button
            onClick={toggleAudio}
            className="bg-primary rounded-full w-14 h-14 flex items-center justify-center"
          >
            {isPlaying ? (
              <MdOutlinePause className="text-white text-4xl" />
            ) : (
              <ImPlay3 className="text-white text-4xl" />
            )}
          </button>
          <p className="text-gray text-lg">CLICK TO LISTEN</p>

          {/* <div className="flex items-center gap-x-5">
            <select className="bg-secondary rounded-[22px] py-1 pl-4 pr-10 focus:border-none focus:ring-0 border-none text-gray text-base">
              <option value="0.8x">0.8x</option>
              <option value="1.0x">1.0x</option>
              <option value="1.2x">1.2x</option>
              <option value="2.0x">2.0x</option>
            </select>
            sound volume
            <div className="flex items-center gap-x-2">
              <AiOutlineSound className="text-xl text-primary" />
              <input
                className="appearance-none h-2 bg-primary text-secondary rounded-full"
                type="range"
              />
            </div>
          </div> */}
        </div>
      </div>
      {/* play */}
      {/* <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-gray text-base">0:00</p>
          <p className="text-gray text-base">0:35</p>
        </div>
        <input
          className="appearance-none h-2 bg-primary text-secondary rounded-full w-full"
          type="range"
        />
      </div> */}
      {/* Transcript */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="text-gray text-base absolute top-2 right-2 py-2 px-3 rounded-3xl bg-secondary cursor-pointer"
      >
        Transcript
      </button>
    </div>
  );
};

export default ListenBlock;
