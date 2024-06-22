import { toggleModal as modalSlice } from "@/redux/slice/globalModalSlice";
import { useEffect } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { useDispatch } from "react-redux";
import GlobalModal from "./GlobalModal";

const SideModal = ({ data }) => {
  const dispatch = useDispatch();
  const toggleModal = () =>
    dispatch(
      modalSlice({
        title: data.title,
        api: data.api,
      })
    );
  useEffect(() => {
    dispatch(
      modalSlice({
        title: data.title,
        api: data.api,
      })
    );
  }, []);
  return (
    <>
      <button
        onClick={toggleModal}
        className="top-2/4 absolute h-16 w-5 lg:h-20 lg:w-7 flex items-center justify-center bg-primary right-0 rounded-tl-3xl rounded-bl-3xl "
      >
        <MdDoubleArrow className="rotate-180 text-white" />
      </button>
      <GlobalModal />
    </>
  );
};
export default SideModal;
