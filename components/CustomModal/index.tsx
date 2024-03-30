import Icon from "@/components/Icon";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  className?: string;
  classWrap?: string;
  classOverlay?: string;
  classButtonClose?: string;
  title?: string;
  visible: boolean;
  onClose: () => void;
  initialFocus?: any;
  children: React.ReactNode;
  video?: boolean;
};

const Modal = ({
  className,
  classOverlay,
  classButtonClose,
  visible,
  onClose,
  initialFocus,
  children,
  video,
}: ModalProps) => {
  return (
    <Transition show={visible} as={Fragment}>
      <Dialog
        initialFocus={initialFocus}
        className={`fixed inset-0 z-50 flex p-6 overflow-auto scroll-smooth md:px-4 ${className}`}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={`fixed inset-0 bg-n-1/85 ${classOverlay}`}
            aria-hidden="true"
          />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom={`opacity-0 ${!video && "scale-95"}`}
          enterTo={`opacity-100 ${!video && "scale-100"}`}
          leave="ease-in duration-200"
          leaveFrom={`opacity-100 ${!video && "scale-100"}`}
          leaveTo={`opacity-0 ${!video && "scale-95"}`}
        >
          <Dialog.Panel className="relative z-10 max-w-[30.625rem] w-full m-auto bg-white dark:bg-white/20">
            {children}
            <button
              className={twMerge(
                `absolute top-5 right-5 text-base hover:fill-primary outline-none fill-white dark:hover:fill-primary w-6 h-6 ${classButtonClose}`
              )}
              onClick={onClose}
            >
              <Icon className="fill-inherit transition-colors" name="close" />
            </button>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
