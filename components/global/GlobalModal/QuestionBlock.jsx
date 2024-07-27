import ButtonFill from "@/components/global/ButtonFill";
import ButtonOutline from "@/components/global/ButtonOutline";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { NoteModal } from "../GlobalMainContent";
const QuestionBlock = ({ data, toggleModal, finalPath }) => {
  // pushing id to search params
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  //checking if the question is bookmarked
  useEffect(() => {
    if (data?.self_bookmark) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [data]);

  const addParam = (event = ChangeEvent) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("que_no");
    current.set("que_no", data.id);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
    toggleModal();
  };
  return (
    <div
      onClick={addParam}
      className="flex flex-col md:flex-row gap-y-3 md:items-center cursor-pointer justify-between border border-primary rounded-[13px] p-3"
    >
      <h2 className="text-md md:text-xl font-medium ">
        {data?.title} | #{data?.id}
      </h2>
      <div className="flex justify-between gap-3 md:gap-x-10">
        <div className="flex flex-wrap md:flex-row gap-2">
          {data?.prediction && (
            <ButtonFill
              text="Prediction"
              bgColor={"cream"}
              textColor={"gray"}
            />
          )}
          {data?.practiced > 0 && (
            <ButtonFill
              text="Practiced"
              count={`(${data?.practiced})`}
              bgColor={"primary"}
              textColor={"gray"}
            />
          )}
          {data?.appeared > 0 && (
            <ButtonOutline
              text="Appeared"
              count={`(${data?.appeared})`}
              borderColor={"primary"}
              textColor={"gray"}
            />
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpen(true);
            }}
          >
            <div className="w-[28px] h-[29px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/Book_mark.svg"
                  fill
                  alt="bookmark"
                />
              </div>
            </div>
          </button>
          <button
            onClick={async (e) => {
              e.stopPropagation();
              try {
                await axios(`/practice/${finalPath}/${data?.id}/bookmark`);
                setBookmarked(!bookmarked);
                toast.success(
                  `${bookmarked ? "Bookmark Removed" : "Bookmark Added"}`,
                  {
                    icon: bookmarked ? "🗑️" : "📌",
                  }
                );
              } catch (error) {
                toast.error("Something went wrong");
              }
            }}
          >
            {bookmarked ? (
              <IoBookmark className="text-primary text-3xl" />
            ) : (
              <CiBookmark className="text-primary text-3xl" />
            )}
          </button>
        </div>
      </div>
      {open && (
        <NoteModal
          open={open}
          setOpen={setOpen}
          title={data?.title}
          id={data?.id}
        />
      )}
    </div>
  );
};

export default QuestionBlock;
