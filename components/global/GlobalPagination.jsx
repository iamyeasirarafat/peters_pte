import { IoIosArrowBack } from "react-icons/io";
import { RxShuffle } from "react-icons/rx";

const GlobalPagination = () => {
  return (
    <div className="flex items-center gap-x-2">
      <button className="w-10 h-7 md:w-[56px] md:h-[45px] bg-secondary rounded-[22px] flex items-center justify-center">
        <RxShuffle className="text-gray text-xl md:text-3xl" />
      </button>
      <div className="bg-secondary rounded-[30px] px-2 md:px-4 py-[5px] flex items-center gap-x-1 md:gap-x-2">
        <IoIosArrowBack className="text-sm md:text-lg text-gray cursor-pointer" />
        <select
          className="py-0 md:py-2  bg-white rounded-[22px] outline-none border-0 focus:outline-none focus:ring-0"
          name=""
          id=""
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <p className="text-sm text-gray font-medium">of</p>
        <p className="text-sm text-gray font-medium">1127</p>
        <IoIosArrowBack className="text-sm md:text-lg text-gray cursor-pointer rotate-180" />
      </div>
    </div>
  );
};
export default GlobalPagination;
