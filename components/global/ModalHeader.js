import { GrClose } from "react-icons/gr";
import { MdOutlineFileDownload } from "react-icons/md";
import AudioDownloader from "../../utils/audioDownloader";

const ModalHeader = ({ id, audio, setOpen }) => {
  const downloadAudio = AudioDownloader();
  return (
    <div className="w-full bg-primary rounded-t-[15px] flex flex-col-reverse md:flex-row gap-3 items-center justify-between px-3 py-2">
      <div className="flex items-center justify-between w-full">
        <p className="text-white text-base md:text-2xl">#{id}</p>
        <p className="text-white text-base md:text-2xl lg:ml-40">
          AI DETAILED SCORE
        </p>
      </div>
      <div className="flex items-center justify-between gap-x-4 w-full md:w-auto md:flex-shrink-0">
        <div className="py-[5px] pl-[10px] pr-5 bg-white rounded-[30px] flex items-center gap-x-4">
          <p className="text-white text-base md:text-lg px-2 py-1 rounded-[30px] bg-blue">
            Target Score
          </p>
          <p className="text-gray text-base md:text-2xl font-medium">80</p>
        </div>
        <div className="flex items-center gap-x-3">
          {audio && (
            <MdOutlineFileDownload
              onClick={() => {
                downloadAudio(audio)
                  .then()
                  .catch((error) => toast.error("Failed to download audio"));
              }}
              className="text-2xl md:text-4xl text-white cursor-pointer"
            />
          )}
          {/* close modal */}
          <button
            onClick={setOpen}
            className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-white flex items-center outline-none justify-center"
          >
            <GrClose className="text-gray text-base md:text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalHeader;
