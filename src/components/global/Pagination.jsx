import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";

const Pagination = ({
  HandleSubmit,
  audioData,
  handleStartRecording,
  isLoading,
}) => {
  return (
    <div className="flex items-center justify-between mt-3">
      <div className="flex items-center gap-x-2">
        <button
          disabled={isLoading}
          onClick={HandleSubmit}
          className="py-2 px-6 disabled:opacity-50 flex items-center gap-1 rounded-[22px] bg-blue text-white font-semibold text-lg"
        >
          {isLoading ? (
            <>
              <div
                className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </button>
        {audioData && (
          <button
            onClick={handleStartRecording}
            className="py-2 px-6 rounded-[22px] bg-primary text-white font-semibold text-lg"
          >
            Re-Test
          </button>
        )}
      </div>
      <div className="flex items-center gap-x-2">
        <button className="w-[56px] h-[45px] bg-secondary rounded-[22px] flex items-center justify-center">
          <div className="w-[32px] h-[25px]">
            <div className="w-full h-full relative">
              <Image
                className="object-cover"
                src="/icons/suppel.svg"
                alt="grow icon"
                fill
              />
            </div>
          </div>
        </button>
        <div className="bg-secondary rounded-[30px] px-4 py-[5px] flex items-center gap-x-2">
          <IoIosArrowBack className="text-lg text-gray cursor-pointer" />
          <select
            className="py-2 bg-white rounded-[22px] outline-none border-0 focus:outline-none focus:ring-0"
            name=""
            id=""
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <p className="text-sm text-gray font-medium">of</p>
          <p className="text-sm text-gray font-medium">1127</p>
          <IoIosArrowBack className="text-lg text-gray cursor-pointer rotate-180" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
