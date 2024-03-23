import { formatDateTime } from "@/utils/formatDateTime";
import { BiSolidTrashAlt } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";

const Score = ({ result, setOpenModal, summary, others, setAiResult }) => {
  return (
    <div className="flex items-center justify-between border border-primary rounded-[15px] p-2">
      {/* profile  Mobile view*/}
      <div className="flex items-center gap-x-2">
        <p className="lg:text-3xl w-10 h-10 flex items-center justify-center text-gray rounded-full border border-primary">
          {result?.user?.full_name?.charAt(0)}
        </p>
        <p className="lg:text-sm text-base text-gray">
          {formatDateTime(result?.created_at, "time")}
        </p>
        <p className="lg:text-sm text-base text-gray">
          {formatDateTime(result?.created_at, "date")}
        </p>
      </div>
      {/* mark */}
      <div className="flex items-center gap-x-2">
        <button className="border border-primary rounded-[30px] flex items-center lg:gap-x-2 gap-x-4 py-1 px-3">
          <p className="text-3xl w-[35px] h-[35px] flex items-center justify-center rounded-full text-white bg-primary">
            S
          </p>
          {/* <p className="text-base lg:text-xl text-gray">
            {result?.scores?.overall ||
              result?.scores?.Overall ||
              result?.scores}
            /10
          </p> */}
        </button>
        {!summary && (
          <button className="border border-primary rounded-[30px] flex items-center lg:gap-x-2 gap-x-4 py-1 px-3">
            <p className="lg:text-base text-3xl lg:w-5 lg:h-5 w-[35px] h-[35px] flex items-center justify-center rounded-full text-white bg-cream">
              R
            </p>
            <p className="text-base lg:text-xl text-gray">
              {result?.reading_score}/90
            </p>
          </button>
        )}
        <button
          onClick={() => {
            setOpenModal(true);
            setAiResult(result);
          }}
          className="border border-primary rounded-[30px] flex items-center lg:gap-x-2 gap-x-4 py-1 px-3"
        >
          <p className="text-base w-[35px] h-[35px] flex items-center justify-center rounded-full text-white bg-blue">
            AI
          </p>
          <p className="text-base lg:text-xl text-gray flex items-center gap-x-1">
            <span className="hidden md:block">Detailed</span> Score
          </p>
          <BsPlusCircle className="text-[#9B9B9A] text-2xl" />
        </button>
      </div>
      {/* icons */}
      {!others && (
        <div className="flex items-center gap-x-4">
          <MdOutlineFileDownload className="text-3xl text-primary cursor-pointer" />
          <BiSolidTrashAlt className="text-2xl text-primary cursor-pointer" />
        </div>
      )}
    </div>
  );
};

export default Score;
