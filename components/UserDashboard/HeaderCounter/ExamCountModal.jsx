import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckSquare } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import ReusableModal from "../../global/ReusableModal";
import Calendar from "../Calendar/PTE_Calendar";

export default function ExamCountModal({ setRefetch, apiCountdown, openEModal, setOpenEModal }) {
  const user = useSelector((state) => state?.user?.user);
  const [selectedDate, setSelectedDate] = useState(null);
  const [countdown, setCountdown] = useState("00d 00h 00m 00s");

  // set countdown if come from api
  useEffect(() => {
    if (!apiCountdown) return;
    setCountdown(apiCountdown);
  }, []);


  //Countdown functionality
  useEffect(() => {
    if (!selectedDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = selectedDate - now;

      if (diff <= 0) {
        setCountdown("0d 00h 00m 00s");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setCountdown(
        `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedDate]);

  const HandleUpdateDate = async () => {
    if (!selectedDate) return;
    try {
      const res = await axios.post("/exam_countdown", {
        exam_date: new Date(selectedDate).toISOString()
      })

      setRefetch((prev) => !prev)
      toast.success('Exam countdown updated successfully')
      setOpenEModal(false)
    }
    catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <ReusableModal open={openEModal} setOpen={setOpenEModal}>
      <div className="bg-white border border-primary rounded-[15px] w-96 md:w-[700px] lg:w-[1000px] xl:w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-2xl capitalize">{user?.full_name}</p>
          <p className="text-white text-2xl ">Exam Countdown</p>
          {/* close modal */}
          <button
            onClick={() => setOpenEModal(false)}
            className="w-9 h-9 rounded-full bg-white flex items-center outline-none justify-center   mr-1"
          >
            <GrClose className="text-gray text-xl" />
          </button>
        </div>
        {/* Modal content */}
        <div className="flex flex-col gap-5 p-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
              <Calendar setSelectedDate={setSelectedDate} />
            </div>
            {/* Time count */}
            <div className="w-full md:w-1/2 h-16 border border-[#F2B277] bg-[#FFF4EB] p-2 rounded-[10px]">
              <p className="text-[30px] md:text-[36px] text-[#616161] bg-white justify-between text-center rounded-[10px] p-3">
                {countdown}
              </p>
            </div>
          </div>
          {/* Your Response */}
          <div className="flex justify-end">
            <button
              onClick={HandleUpdateDate}
              className=" w-48 flex gap-2 border border-[#F2B277] bg-[#F4D1B1] rounded-[10px] justify-center items-center py-2 px-2">
              <p className="text-[#616161] text-[16px] font-normal">
                Update Exam Date
              </p>
              <FiCheckSquare className="text-[#616161]" size={20} />
            </button>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
}
