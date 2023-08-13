import { BiSolidTrashAlt } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";

const Score = ({ result, setOpenModal, summary }) => {
  return (
    <div className="flex items-center justify-between border border-primary rounded-[15px] p-2">
      {/*  */}
      <div className="flex items-center gap-x-2">
        <p className="text-4xl w-[55px] h-[55px] flex items-center justify-center text-gray rounded-full border border-primary">
          T
        </p>
        <p className="text-base text-gray">01:13</p>
        <p className="text-base text-gray">PM 02/07/2023</p>
      </div>
      {/*  */}
      <div className="flex items-center gap-x-2">
        <button className="border border-primary rounded-[30px] flex items-center gap-x-4 py-1 pl-2 pr-7">
          <p className="text-3xl w-[35px] h-[35px] flex items-center justify-center rounded-full text-white bg-primary">
            S
          </p>
          <p className="text-xl text-gray">
            {result?.speaking_score || result?.Overall}/{summary ? "7" : "90"}
          </p>
        </button>
        {!summary && (
          <button className="border border-primary rounded-[30px] flex items-center gap-x-4 py-1 pl-2 pr-7">
            <p className="text-3xl w-[35px] h-[35px] flex items-center justify-center rounded-full text-white bg-cream">
              R
            </p>
            <p className="text-xl text-gray">{result?.reading_score}/90</p>
          </button>
        )}
        <button
          onClick={() => setOpenModal(true)}
          className="border border-primary rounded-[30px] flex items-center gap-x-4 py-1 pl-2 pr-7"
        >
          <p className="text-2xl w-[35px] h-[35px] flex items-center justify-center rounded-full text-white bg-blue">
            AI
          </p>
          <p className="text-xl text-gray">Detailed Score</p>
          <BsPlusCircle className="text-[#9B9B9A] text-2xl" />
        </button>
      </div>
      {/*  */}
      <div className="flex items-center gap-x-7">
        <MdOutlineFileDownload className="text-3xl text-primary cursor-pointer" />
        <BiSolidTrashAlt className="text-2xl text-primary cursor-pointer" />
      </div>
    </div>
  );
};

export default Score;
