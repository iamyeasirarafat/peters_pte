import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { RxShuffle } from "react-icons/rx";
import { getPageName } from "../../utils/getPageName";

const GlobalPagination = () => {
  const [qId, setQId] = useState();
  const router = useRouter();

  const pageName = getPageName(router?.pathname);
  const apiRoute =
    (pageName === "multiple_answers" ||
      pageName === "fill_blanks" ||
      pageName === "single_answer") &&
    router?.pathname.includes("reading_test")
      ? `${pageName}_reading`
      : (pageName === "multiple_answers" ||
          pageName === "fill_blanks" ||
          pageName === "single_answer") &&
        router?.pathname.includes("listening_test")
      ? `${pageName}_listening`
      : pageName;

  const index = qId?.findIndex(
    (item) => item === parseInt(router?.query?.que_no)
  );

  useEffect(() => {
    const getQid = async () => {
      const res = await axios.get(`/ids/${apiRoute}`);
      setQId(res.data);
    };
    router?.pathname && getQid();
  }, [router?.pathname]);

  const handelSetQuestionId = (id) => {
    router.push({
      query: { que_no: id },
    });
  };
  useEffect(() => {
    qId && handelSetQuestionId(qId[qId.length - 1]);
  }, [qId]);
  return (
    <div className="flex items-center gap-x-2">
      <button className="w-10 h-7 md:w-[56px] md:h-[45px] bg-secondary rounded-[22px] flex items-center justify-center hover:bg-[#ffe4cd] duration-200">
        <RxShuffle
          onClick={() =>
            handelSetQuestionId(qId[Math.floor(Math.random() * qId.length)])
          }
          className="text-gray text-xl md:text-3xl"
        />
      </button>
      <div className="bg-secondary rounded-[30px] px-2 md:px-4 py-[5px] flex items-center gap-x-1 md:gap-x-2">
        <IoIosArrowBack
          onClick={() => index !== 0 && handelSetQuestionId(qId[index - 1])}
          className="text-sm md:text-lg text-gray cursor-pointer"
        />
        <select
          value={qId?.[index]}
          onChange={(e) => handelSetQuestionId(e.target.value)}
          className="py-0 md:py-2  bg-white rounded-[22px] outline-none border-0 focus:outline-none focus:ring-0"
        >
          {qId?.map((item, i) => (
            <option key={i} value={item}>
              {i + 1}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray font-medium">of</p>
        <p className="text-sm text-gray font-medium">{qId?.length}</p>
        <IoIosArrowBack
          onClick={() =>
            parseInt(router?.query?.que_no) !== qId?.[qId?.length - 1] &&
            handelSetQuestionId(qId[index + 1])
          }
          className="text-sm md:text-lg text-gray cursor-pointer rotate-180"
        />
      </div>
    </div>
  );
};
export default GlobalPagination;
