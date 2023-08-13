import { toggleModal as modalSlice } from "@/src/redux/slice/globalModalSlice";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import QuestionBlock from "./QuestionBlock";
import QuestionNavigation from "./QuestionNavigation";

const GlobalModal = () => {
  //redux state management functions
  const state = useSelector((state) => state.globalModal);
  const dispatch = useDispatch();
  const toggleModal = () => dispatch(modalSlice({}));
  const [questionType, setQuestionType] = useState("All");

  //getting Data from api functions
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(state?.data?.api);
      setData(data);
    };
    if (state.visible) {
      getData();
    }
  }, [state]);

  // data filtration
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (questionType === "All") {
      setFilteredData(data);
    }
    if (questionType === "Practiced") {
      const filter = data.filter((item) => item.practiced > 0);
      setFilteredData(filter);
    }
    if (questionType === "Not_Practiced") {
      const filter = data.filter((item) => item.practiced === 0);
      setFilteredData(filter);
    }
  }, [data, questionType]);
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
                <Dialog.Panel className="pointer-events-auto w-screen bg-secondary pt-12 px-7 pb-7 overflow-hidden mt-32 border border-primary rounded-tl-[68px] max-w-6xl">
                  <div className="w-full">
                    <div className="border flex justify-between border-primary rounded-xl px-7 py-3">
                      <div className="flex gap-2 items-center">
                        <h2 className="font-cabin text-4xl text-gray">
                          {state?.data?.title}
                        </h2>

                        <h2 className="font-cabin text-xl text-gray">
                          | {data?.length} Question
                        </h2>
                      </div>
                      <div className="max-w-lg w-full relative bg-white overflow-hidden rounded-3xl">
                        <input
                          className="w-full focus:ring-0 placeholder:text-xl rounded-3xl border-none pl-8 placeholder:text-gray placeholder:font-light "
                          placeholder="Search By Question Title / Number"
                        />
                        <img
                          src="/icons/searchIcon.svg"
                          alt=""
                          className="absolute right-4 top-0"
                        />
                      </div>
                    </div>
                    {/* Question type */}
                    <QuestionNavigation
                      questionType={questionType}
                      setQuestionType={setQuestionType}
                    />
                    {/* Questions block  */}
                    <div className="relative border border-primary rounded-[13px] bg-white p-5 mt-11">
                      {/* tab button */}
                      <div className="flex items-center gap-x-2 absolute bottom-[100.2%] right-5">
                        <button className="text-gray py-1 px-3 rounded-t-md text-base bg-cream">
                          All
                        </button>
                        <button className="text-gray py-1 px-3 rounded-t-md text-base bg-primary">
                          Prediction
                        </button>
                        <button className="text-white py-1 px-3 rounded-t-md text-base bg-blue">
                          BookMarked
                        </button>
                      </div>
                      <div className="space-y-2">
                        {/* Question */}
                        {filteredData?.map((item, i) => (
                          <QuestionBlock
                            toggleModal={toggleModal}
                            key={i}
                            data={item}
                          />
                        ))}
                      </div>
                      {/* pagination */}
                      <div className="flex items-center justify-end pt-4">
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
