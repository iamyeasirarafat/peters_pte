import { toggleModal as modalSlice } from "@/src/redux/slice/globalModalSlice";
import { useDispatch, useSelector } from "react-redux";

const GlobalModal = () => {
  const dispatch = useDispatch();
  const toggleModal = () => dispatch(modalSlice({ data: "sss" }));

  return (
    <>
      <button
        onClick={toggleModal}
        className="top-2/4 absolute h-20 w-7 bg-primary right-0 rounded-tl-3xl rounded-bl-3xl "
      >
        <img src="/icons/chevrons-right-double.svg" />
      </button>
      <Modal />
    </>
  );
};
export default GlobalModal;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Modal = () => {
  const { state } = useSelector((state) => state.globalModal);
  const dispatch = useDispatch();
  const toggleModal = () => dispatch(modalSlice({}));

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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                          Read Aloud
                        </h2>

                        <h2 className="font-cabin text-xl text-gray">
                          | 1121 Question
                        </h2>
                      </div>
                      <div className="max-w-lg w-full relative bg-white overflow-hidden rounded-3xl">
                        <input
                          className="w-full   placeholder:text-xl rounded-3xl border-none pl-8 placeholder:text-gray placeholder:font-light "
                          placeholder="Search By Question Title / Number"
                        />
                        <img
                          src="/icons/searchIcon.svg"
                          alt=""
                          className="absolute right-4 top-0"
                        />
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
