import { toggleModal as modalSlice } from "@/redux/slice/globalModalSlice";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getPageName } from "../../../utils/getPageName";
import QuestionBlock from "./QuestionBlock";
import QuestionNavigation from "./QuestionNavigation";
import { CiSearch } from "react-icons/ci";

const GlobalModal = () => {
  //redux state management functions
  const state = useSelector((state) => state.globalModal);
  const dispatch = useDispatch();
  const toggleModal = () => dispatch(modalSlice({}));
  const [questionType, setQuestionType] = useState("All");
  const [queryParams, setQueryParams] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [prediction, setPrediction] = useState(false);
  const [bookmark, setBookmark] = useState(false);
  const limit = 10;
  //getting Data from api functions
  const [data, setData] = useState([]);
  useEffect(() => {
    const api = `${state.data.api}${`?page=${
      pageNumber ? pageNumber : 1
    }`}${`&limit=${limit}`}${queryParams ? `&query=${queryParams}` : ""}${
      prediction ? `&prediction=${prediction}` : ""
    }${bookmark ? `&bookmark=${bookmark}` : ""}`;
    console.log(api);
    const getData = async () => {
      const { data } = await axios(api);
      setData(data);
    };
    if (state.visible) {
      getData();
    }
  }, [bookmark, pageNumber, prediction, queryParams, state]);

  // data filtration
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (questionType === "All") {
      setFilteredData(data?.results);
    }
    if (questionType === "Practiced") {
      const filter = data?.results.filter((item) => item.practiced > 0);
      setFilteredData(filter);
    }
    if (questionType === "Not_Practiced") {
      const filter = data?.results.filter(
        (item) => item.practiced === 0 || !item.practiced
      );
      setFilteredData(filter);
    }
  }, [data, questionType]);
  console.log(typeof pageNumber);
  //creating final path for the api
  const router = useRouter();
  const pageName = getPageName(router?.pathname);
  const finalPath =
    pageName === "summarize_written"
      ? "summarize"
      : pageName === "read_write_blanks"
      ? "read_write_blank"
      : pageName === "multiple_answers" &&
        router?.pathname.includes("reading_test")
      ? "multi_choice_reading"
      : pageName === "single_answer" &&
        router?.pathname.includes("reading_test")
      ? "multi_choice_reading"
      : pageName === "fill_blanks" && router?.pathname.includes("reading_test")
      ? "blank_reading"
      : pageName === "multiple_answers" &&
        router?.pathname.includes("listening_test")
      ? "multi_choice"
      : pageName === "single_answer" &&
        router?.pathname.includes("listening_test")
      ? "multi_choice"
      : pageName === "fill_blanks" &&
        router?.pathname.includes("listening_test")
      ? "blank"
      : pageName;
  return (
    <Transition.Root show={state.visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen bg-secondary pt-4 md:pt-12 px-3 md:px-7 pb-7 overflow-hidden mt-32 border border-primary rounded-tl-[20px] md:rounded-tl-[40px] max-w-6xl">
                  <div className="w-full">
                    <div className="border sm:flex justify-between border-primary rounded-xl px-3 md:px-7 py-3 gap-y-4">
                      <div className="flex gap-2 items-center">
                        <h2 className="font-cabin text-2xl sm:text-4xl text-gray">
                          {state?.data?.title}
                        </h2>

                        <h2 className="font-cabin text-xl text-gray">
                          | {data?.length} Question
                        </h2>
                      </div>
                      <div className="max-w-lg w-full relative bg-white overflow-hidden rounded-3xl">
                        <input
                          onChange={(e) => {
                            setTimeout(
                              () => setQueryParams(e.target.value),
                              1000
                            );
                          }}
                          type="text"
                          className="w-full text-sm md:text-base focus:ring-0 placeholder:text-xs md:placeholder:text-lg rounded-3xl border-none pl-3 md:pl-8 placeholder:text-gray placeholder:font-light "
                          placeholder="Search By Question Title / Number"
                        />
                        <CiSearch className="absolute right-4 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    {/* Question type */}
                    <QuestionNavigation
                      questionType={questionType}
                      setQuestionType={setQuestionType}
                    />
                    {/* Questions block  */}
                    <div className="relative border border-primary rounded-[13px] bg-white p-2 md:p-5 mt-11">
                      {/* tab button */}
                      <div className="flex items-center gap-x-2 absolute bottom-full right-5">
                        <button
                          onClick={() => setPrediction(false)}
                          className={`${
                            prediction ? "bg-cream" : "bg-primary"
                          } text-gray py-1 px-3 rounded-t-md text-base `}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setPrediction((prev) => !prev)}
                          className={`${
                            prediction ? "bg-primary" : "bg-cream"
                          } text-gray py-1 px-3 rounded-t-md text-base `}
                        >
                          Prediction
                        </button>
                        <button
                          onClick={() => setBookmark((prev) => !prev)}
                          className={`${
                            bookmark ? "bg-primary" : "bg-cream"
                          } text-gray py-1 px-3 rounded-t-md text-base `}
                        >
                          BookMarked
                        </button>
                      </div>
                      <div className="space-y-2 h-[calc(100vh-28rem)] pr-2 overflow-auto content-scrollbar">
                        {/* Question */}
                        {Array.isArray(filteredData) &&
                          filteredData?.map((item, i) => (
                            <QuestionBlock
                              finalPath={finalPath}
                              toggleModal={toggleModal}
                              key={i}
                              data={item}
                            />
                          ))}
                      </div>
                      {/* pagination */}
                      <div className="flex items-center justify-end pt-4">
                        <div className="bg-secondary rounded-[30px] px-4 py-[5px] flex items-center gap-x-2">
                          <button
                            disabled={!data.prev}
                            onClick={() =>
                              setPageNumber(Number(pageNumber) - 1)
                            }
                            className="disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <IoIosArrowBack className="text-lg text-gray " />
                          </button>
                          <input
                            value={pageNumber}
                            onChange={(e) => setPageNumber(e.target.value)}
                            type="number"
                            className="py-2 w-15 appearance-none bg-white rounded-[22px] outline-none border-0 focus:outline-none focus:ring-0 text-center"
                          />

                          {/* //for hide the up and down button */}
                          <style jsx>{`
                            input[type="number"]::-webkit-outer-spin-button,
                            input[type="number"]::-webkit-inner-spin-button {
                              -webkit-appearance: none;
                              margin: 0;
                            }

                            input[type="number"] {
                              -moz-appearance: textfield;
                            }
                          `}</style>
                          <p className="text-sm text-gray font-medium">of</p>
                          <p className="text-sm text-gray font-medium">
                            {Math.ceil(data?.total / limit)}
                          </p>
                          <button
                            disabled={!data.next}
                            onClick={() =>
                              setPageNumber(Number(pageNumber) + 1)
                            }
                            className="disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <IoIosArrowBack className="text-lg text-gray rotate-180" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default GlobalModal;
