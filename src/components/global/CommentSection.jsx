import React, { useEffect, useState } from "react";
import TabButton from "./TabButton";
import { BiComment, BiLike, BiSolidTrashAlt } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ReusableModal from "./ReusableModal";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formatDateTime } from "@/src/utils/formatDateTime";
import { useSearchParams } from "next/navigation";
import { getPageName } from "@/src/utils/getPageName";

function CommentSection() {
  const [open, setOpen] = useState({ state: false, id: null });
  const [parentComment, setParentComment] = useState([]);
  const [fetch, setFetch] = useState(false);
  const params = useSearchParams();
  const id = params.get("que_no");

  // page name check
  console.log(getPageName(), "page name", id, "id");

  useEffect(() => {
    const getComment = async () => {
      const res = await axios.get(
        `https://api.codebyamirus.link/${getPageName()}/${id}/discussions`
      );
      setParentComment(res?.data);
    };
    getComment();
  }, [id, fetch]);
  return (
    <>
      {/*add comment modal open */}
      <button
        onClick={() => setOpen({ state: true, id: id })}
        className="py-2 px-3 bg-primary text-gray text-base rounded-[15px] flex items-center gap-x-2 mb-2"
      >
        Add comment <AiOutlinePlusCircle className="text-base" />
      </button>
      {/* comment show*/}
      <div className="space-y-2">
        {parentComment?.map((item, i) => {
          return (
            <div key={i} className="border border-primary rounded-[15px] p-3">
              <CommentBlock parent comment={item} />
              {/* child comment */}
              <div className="pl-24">
                <p>here is child comment</p>
              </div>
            </div>
          );
        })}
      </div>
      <AddCommentModal
        open={open}
        setOpen={setOpen}
        fetch={fetch}
        setFetch={setFetch}
      />
    </>
  );
}
export default CommentSection;

const CommentBlock = ({ parent, comment }) => {
  return (
    <div className="flex items-center justify-between gap-x-3">
      <div className="flex-grow flex items-center gap-x-2">
        <p className="text-3xl w-10 h-10 flex items-center justify-center text-gray rounded-full border border-primary capitalize">
          {comment?.user?.full_name?.charAt(0)}
        </p>
        <div className="w-full">
          <p className="text-sm text-gray flex items-center gap-x-8">
            {comment?.user?.full_name}
            <p className="flex items-center gap-x-3">
              <span>{formatDateTime(comment?.created_at, "time")}</span>
              <span>{formatDateTime(comment?.created_at, "date")}</span>
            </p>
          </p>
          {parent ? (
            <p className="text-sm text-[#949494]">{comment?.body}</p>
          ) : (
            <input
              type="text"
              className="w-full placeholder:text-[#ACACAC] placeholder:italic text-gray text-sm border border-x-0 border-t-0 border-b-primary outline-none focus:ring-transparent focus:border-primary p-0 m-0"
              placeholder="Write Text Here......."
            />
          )}
        </div>
      </div>
      {/* like delete */}
      <div className="flex items-center gap-x-4">
        <p className="flex items-end gap-x-2">
          <BiComment className="text-cream text-xl cursor-pointer" />
          <span className="text-gray text-xs">{comment?.replies?.length}</span>
        </p>
        <p className="flex items-end gap-x-2">
          <BiLike className="text-cream text-xl cursor-pointer" />
          <span className="text-gray text-xs">{comment?.like?.length}</span>
        </p>
        {parent && (
          <BiSolidTrashAlt className="text-primary text-xl cursor-pointer" />
        )}
      </div>
    </div>
  );
};

const AddCommentModal = ({ open, setOpen, fetch, setFetch }) => {
  const [commentType, setCommentType] = useState("Discuss");
  const allCommentType = [
    { name: "Discuss" },
    { name: "New Question" },
    { name: "New Error" },
  ];
  // post comment
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const FormData = {
      read_aloud: open?.id,
      body: data?.body,
      images: data?.images[0],
      type: commentType,
    };
    const res = await axios.post(
      `https://api.codebyamirus.link/${getPageName()}/discussion`,
      FormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    reset();
    setOpen({ state: false, id: null });
    setFetch(!fetch);
    toast.success("Your comment added successfully");
  };

  return (
    <ReusableModal open={open?.state} setOpen={setOpen} className="w-6/12">
      <div className="bg-white border border-primary rounded-[15px] w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-xl">#7250589</p>
          <p className="text-white text-xl">Add You Comment</p>
          <button
            onClick={() => setOpen({ state: false, id: null })}
            className="w-7 h-7 rounded-full bg-white flex items-center outline-none justify-center"
          >
            <GrClose className="text-gray text-base" />
          </button>
        </div>
        {/* Modal content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <textarea
            {...register("body", { required: true })}
            className="bg-white text-xl border border-primary rounded-[15px] p-3 w-full"
            rows="3"
            placeholder="Wright your comment"
          ></textarea>
          {/* comment type */}
          <div className="flex items-center gap-x-3 my-2.5">
            <p className="text-base text-gray">Your Comment Type:*</p>
            {allCommentType?.map((type, i) => (
              <button
                type="button"
                key={i}
                onClick={() => setCommentType(type?.name)}
                className={`text-base text-gray ${
                  type?.name === commentType ? "bg-secondary" : "bg-white"
                } border border-primary py-2 px-3 rounded-[10px] font-medium`}
              >
                {type?.name}
              </button>
            ))}
          </div>
          {/* add photo */}
          <div className="text-start">
            <label className="inline-flex items-center gap-x-2 py-2 px-3 bg-white text-gray border border-primary cursor-pointer rounded-[10px]">
              Add Photo <AiOutlinePlusCircle className="text-base" />
              <input {...register("images")} type="file" className="hidden" />
            </label>
          </div>
          {/* post comment */}
          <div className="flex justify-end mt-2.5">
            <button
              type="submit"
              className="py-2 px-3 bg-primary text-gray text-base rounded-[15px] flex items-center gap-x-2"
            >
              Post Comment <AiOutlinePlusCircle className="text-base" />
            </button>
          </div>
        </form>
      </div>
    </ReusableModal>
  );
};
