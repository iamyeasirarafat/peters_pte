import { BiSolidTrashAlt } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";

const Score = ({ result, setOpenModal, summary }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-2 items-center justify-between border border-primary rounded-[15px] p-2">
      <div className=" flex lg:hidden items-center justify-between w-full">
        <div className="flex items-center gap-x-2">
          <p className="text-base lg:text-4xl w-[35px] h-[35px] lg:w-[55px] lg:h-[55px] flex items-center justify-center text-gray rounded-full border border-primary">
            T
          </p>
          <p className="text-sm lg:text-base text-gray">01:13</p>
          <p className="text-sm lg:text-base text-gray">PM 02/07/2023</p>
        </div>
        <div className="flex items-center gap-x-3 lg:gap-x-7">
          <MdOutlineFileDownload className="text-xl lg:text-3xl text-primary cursor-pointer" />
          <BiSolidTrashAlt className="text-lg lg:text-2xl text-primary cursor-pointer" />
        </div>
      </div>
      {/* profile */}
      <div className="hidden lg:flex items-center gap-x-2">
        <p className="text-base lg:text-4xl w-[35px] h-[35px] lg:w-[55px] lg:h-[55px] flex items-center justify-center text-gray rounded-full border border-primary">
          T
        </p>
        <p className="text-sm lg:text-base text-gray">01:13</p>
        <p className="text-sm lg:text-base text-gray">PM 02/07/2023</p>
      </div>
      {/* mark */}
      <div className="flex items-center gap-x-2">
        <button className="border border-primary rounded-[30px] flex items-center gap-x-2 lg:gap-x-4 py-1 px-3">
          <p className="text-base lg:text-3xl w-5 h-5 lg:w-[35px] lg:h-[35px] flex items-center justify-center rounded-full text-white bg-primary">
            S
          </p>
          <p className="text-base lg:text-xl text-gray">
            {result?.speaking_score || result?.Overall || result?.score}/
            {summary ? "10" : "90"}
          </p>
        </button>
        {!summary && (
          <button className="border border-primary rounded-[30px] flex items-center gap-x-2 lg:gap-x-4 py-1 px-3">
            <p className="text-base lg:text-3xl w-5 h-5 lg:w-[35px] lg:h-[35px] flex items-center justify-center rounded-full text-white bg-cream">
              R
            </p>
            <p className="text-base lg:text-xl text-gray">
              {result?.reading_score}/90
            </p>
          </button>
        )}
        <button
          onClick={() => setOpenModal(true)}
          className="border border-primary rounded-[30px] flex items-center gap-x-2 lg:gap-x-4 py-1 px-3"
        >
          <p className="text-base lg:text-2xl w-5 h-5 lg:w-[35px] lg:h-[35px] flex items-center justify-center rounded-full text-white bg-blue">
            AI
          </p>
          <p className="text-base lg:text-xl text-gray flex items-center gap-x-1">
            <span className="hidden md:block">Detailed</span> Score
          </p>
          <BsPlusCircle className="text-[#9B9B9A] text-2xl" />
        </button>
      </div>
      {/* icons */}
      <div className="hidden lg:flex items-center gap-x-3 lg:gap-x-7">
        <MdOutlineFileDownload className="text-xl lg:text-3xl text-primary cursor-pointer" />
        <BiSolidTrashAlt className="text-lg lg:text-2xl text-primary cursor-pointer" />
      </div>
    </div>
  );
};

export default Score;
