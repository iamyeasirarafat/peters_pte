import { formatDateTime } from "@/utils/formatDateTime";
import { BiSolidTrashAlt } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import AudioDownloader from "../../utils/audioDownloader";

const Score = ({
  result,
  setOpenModal,
  summary,
  others,
  setAiResult,
  answer_question,
  describe_image,
  repeat_sentence,
  downloadable,
}) => {

  const downloadAudio = AudioDownloader();
  return (
    <div className="border border-oldPrimary rounded-[15px] p-2">
      <div className="flex items-center justify-between ">
        {/* profile*/}
        <div className="flex items-center gap-x-2">
          <p className="lg:text-3xl w-10 h-10 flex items-center  font-cabin justify-center text-white rounded-full  bg-primary">
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
        <div className="md:flex hidden items-center gap-x-2">
          {!answer_question && (
            <button className="min-w-[120px] cursor-default  rounded-[30px] flex items-center justify-start lg:gap-x-2 gap-x-4 py-1 px-3">
              <p className="lg:text-base text-3xl w-[35px] h-[35px] flex items-center justify-center rounded-full text-white bg-oldPrimary">
                S
              </p>
              <p className="text-base lg:text-xl text-gray">
                {typeof result?.scores == "object"
                  ? result?.scores?.speaking ||
                  result?.scores?.num_matching_words ||
                  result?.scores?.overall ||
                  result?.scores?.Overall ||
                  result.scores.score
                  : result?.scores}
              </p>
            </button>
          )}
          {!summary && !answer_question && !describe_image && (
            <button className="min-w-[120px] cursor-default  rounded-[30px] flex items-center justify-start lg:gap-x-2 gap-x-4 py-1 px-3">
              <p className="lg:text-base text-3xl w-[35px] h-[35px] flex items-center justify-center rounded-full text-white bg-[#3EC70B]">
                {
                  repeat_sentence ? 'L' : 'R'
                }
              </p>
              <p className="text-base lg:text-xl text-gray">
                {repeat_sentence ? `${result?.scores?.listening || 0}` : `${typeof result?.scores == "object"
                  ? result?.scores?.reading || result?.scores?.Reading || 0
                  : result?.scores || 0}`}
              </p>
            </button>
          )}
          <button
            onClick={() => {
              setOpenModal(true);
              setAiResult(result);
            }}
            className="border hover:bg-secondary duration-200 border-primary rounded-[30px] flex items-center lg:gap-x-2 gap-x-4 py-1 px-3"
          >
            <p className="text-base w-[35px] h-[35px] flex items-center justify-center rounded-full text-white bg-primary">
              AI
            </p>
            <p className="text-base lg:text-xl text-gray flex items-center gap-x-1">
              Score
            </p>
            <BsPlusCircle className="text-[#9B9B9A] text-2xl" />
          </button>
        </div>
        {/* icons */}
        {!others && (
          <div className="flex items-center gap-x-4">
            {
              downloadable && <MdOutlineFileDownload
                onClick={() => {
                  downloadAudio(result?.audio)
                    .then()
                    .catch((error) => toast.error("Failed to download audio"));
                }}
                className="text-3xl text-primary cursor-pointer" />
            }
            <BiSolidTrashAlt className="text-2xl text-oldPrimary cursor-pointer" />
          </div>
        )}
      </div>
      {/* only mobile view */}
      <div className="flex md:hidden mt-2 justify-evenly items-center gap-x-2">
        {!answer_question && (
          <button className="min-w-[120px] cursor-default  rounded-[30px] flex items-center justify-start lg:gap-x-2 gap-x-4 py-1 px-3">
            <p className="lg:text-base w-[25px] h-[25px] flex items-center justify-center rounded-full text-white bg-oldPrimary">
              S
            </p>
            <p className="text-base lg:text-xl text-gray">
              {typeof result?.scores == "object"
                ? result?.scores?.speaking ||
                result?.scores?.overall ||
                result?.scores?.Overall ||
                result.scores.score
                : result?.scores}
            </p>
          </button>
        )}
        {!summary && !answer_question && !describe_image && (
          <button className="min-w-[120px] cursor-default  rounded-[30px] flex items-center justify-start lg:gap-x-2 gap-x-4 py-1 px-3">
            <p className="lg:text-base w-[25px] h-[25px] flex items-center justify-center rounded-full text-white bg-[#3EC70B]">
              R
            </p>
            <p className="text-base lg:text-xl text-gray">
              {typeof result?.scores == "object"
                ? result?.scores?.reading || result?.scores?.Reading || 0
                : result?.scores || 0}
            </p>
          </button>
        )}
        <button
          onClick={() => {
            setOpenModal(true);
            setAiResult(result);
          }}
          className="border hover:bg-secondary duration-200 border-primary rounded-[30px] flex items-center lg:gap-x-2 gap-x-4 py-1 px-3"
        >
          <p className="text-base w-[25px] h-[25px] flex items-center justify-center rounded-full text-white bg-primary">
            AI
          </p>
          <p className="text-base lg:text-xl text-gray flex items-center gap-x-1">
            Score
          </p>
        </button>
      </div>
    </div>
  );
};

export default Score;
