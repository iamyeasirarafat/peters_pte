import { toggleModal as modalSlice } from "@/src/redux/slice/globalModalSlice";
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

  return (
    <>
      <button
        onClick={toggleModal}
        className="top-2/4 absolute h-20 w-7 bg-primary right-0 rounded-tl-3xl rounded-bl-3xl "
      >
        <img src="/icons/chevrons-right-double.svg" alt="" />
      </button>
      <GlobalModal />
    </>
  );
};
export default SideModal;
