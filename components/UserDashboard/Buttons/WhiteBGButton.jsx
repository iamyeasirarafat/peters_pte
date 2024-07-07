import { BsArrowRightCircle } from "react-icons/bs";

export default function WhiteBGButton({ title, handelClick }) {
  return (
    <>
      <button
        onClick={handelClick}
        className="flex justify-center items-center gap-x-3 px-3 py-2 bg-white rounded-[30px] text-black"
      >
        <span className="text-[11px] md:text-[14px] lg:text-[18px] font-normal">
          {title}
        </span>
        <BsArrowRightCircle className="h-5 w-5 md:h-7 md:w-7" />
      </button>
    </>
  );
}
