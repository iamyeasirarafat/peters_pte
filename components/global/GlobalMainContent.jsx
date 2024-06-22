import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { CiBookmark, CiFileOn } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { getPageName } from "../../utils/getPageName";
import Loading from "../Loading";
import Modal from "../Modal";
const GlobalMainContent = ({ children, data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
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
  //checking if the question is bookmarked
  useEffect(() => {
    if (data?.self_bookmark) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }, [data]);

  return (
    <div className="relative rounded-[15px] mt-12">
      {/* tab button */}
      <div className="flex items-center gap-x-2 absolute bottom-full right-5">
        {data?.prediction && (
          <button className="text-gray py-1 px-3 rounded text-base bg-secondary ">
            Prediction
          </button>
        )}
        <button className="text-gray py-1 px-3 rounded text-base bg-secondary ">
          Practiced {data?.practiced ? `(${data?.practiced})` : ""}
        </button>
        <button className="text-gray py-1 px-3 rounded text-base bg-secondary ">
          Appeared ({data?.appeared ? data?.appeared : 0})
        </button>
      </div>
      <div className=" py-1 border-b-2 border-oldPrimary px-4 flex items-center justify-between">
        <p className="text-oldPrimary font-medium text-2xl">
          {data?.title} | Q No. #{data?.id}
        </p>
        <div className="flex items-center gap-x-2">
          <CiFileOn
            onClick={() => setOpen(true)}
            title="note"
            className="text-oldPrimary text-3xl cursor-pointer"
          />
          <button
            onClick={async () => {
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
              <IoBookmark className="text-oldPrimary text-3xl" />
            ) : (
              <CiBookmark className="text-oldPrimary text-3xl" />
            )}
          </button>
        </div>
      </div>
      <div className="px-4 md:px-6 py-2 space-y-5">{children}</div>
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

export default GlobalMainContent;

export const NoteModal = ({ open, setOpen, title, id }) => {
  const heading = `${title} | Q No. #${id}`;
  const router = useRouter();
  const [note, setNote] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
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

  // get note from api
  useEffect(() => {
    setLoading(true);
    const getNote = async () => {
      const res = await axios(`/${finalPath}/${id}/note`);
      setNote(res?.data?.note);
      setLoading(false);
      res?.data?.note && setIsFirst(false);
    };
    router.isReady && id && getNote();
  }, [id, router.isReady, pageName, open]);

  // add note
  const addNote = async () => {
    try {
      setUploading(true);

      await axios.post(`/${finalPath}/${id}/note`, { note });
      toast.success(`${note && !isFirst ? "Note Updated" : "Note Added"}`);
      setOpen(false);
      setNote("");
      setUploading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setUploading(false);
    }
  };

  return (
    <Modal
      title={heading}
      visible={open}
      onClose={() => {
        setOpen(false);
        setNote("");
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className=" flex items-center justify-between">
            <label htmlFor="note">Note</label>
            {note && !isFirst && (
              <button
                onClick={() => setIsUpdate(!isUpdate)}
                className="bg-blue text-white py-1 px-3 rounded-lg ml-2"
              >
                {!isUpdate ? "Edit" : "Cancel"}
              </button>
            )}
          </div>
          <textarea
            className="w-full border-primary disabled:bg-slate-100 disabled:cursor-not-allowed  outline-none focus:ring-0 focus:border-primary rounded-lg p-2 mt-2"
            name="note"
            id="note"
            value={note}
            disabled={!isUpdate && !isFirst}
            placeholder="Write your note here..."
            onChange={(e) => setNote(e.target.value)}
            required
            rows={5}
          />
          {/* button add, update, delete */}
          <div className="flex justify-end mt-5">
            <button
              onClick={addNote}
              className="bg-primary text-white py-1 px-3 rounded-lg flex items-center justify-between gap-x-2"
            >
              {uploading && <LoaderIcon />}{" "}
              {note && !isFirst ? "Update" : "Add"}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};
