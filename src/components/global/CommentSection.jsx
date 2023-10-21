import React, { useEffect, useState } from "react";
import { BiComment, BiLike, BiSolidTrashAlt } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ReusableModal from "./ReusableModal";
import { GrClose } from "react-icons/gr";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formatDateTime } from "@/src/utils/formatDateTime";
import { usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { getPageName } from "@/src/utils/getPageName";

function CommentSection() {
  const [open, setOpen] = useState({ state: false, id: null });
  const [isAddReply, setIsAddReply] = useState({ state: false, id: null });
  const [parentComment, setParentComment] = useState([]);
  const [fetch, setFetch] = useState(false);
  const { user } = useSelector((state) => state?.user);
  const params = useSearchParams();
  const id = params.get("que_no");
  const pathname = usePathname();

  useEffect(() => {
    let pageName = getPageName(pathname);
    pageName =
      pageName === "multiple_answers" || pageName === "single_answer"
        ? "multi_choice"
        : pageName;
    try {
      const getComment = async () => {
        const res = await axios.get(
          `https://api.codebyamirus.link/${pageName}/${id}/discussions`
        );
        setParentComment(res?.data);
      };
      getComment();
    } catch (error) {
      toast.error(error?.message);
    }
  }, [id, fetch, pathname]);
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
        {parentComment?.map((item) => {
          return (
            <div
              key={item?.id}
              className="border border-primary rounded-[15px] p-3 space-y-2"
            >
              {/* parent comment show */}
              <CommentBlock
                isParent
                data={item}
                setIsAddReply={setIsAddReply}
                fetch={fetch}
                setFetch={setFetch}
                pathname={pathname}
              />
              {/* child comment */}
              <div className="pl-16 space-y-3">
                {/* child comment show */}
                {item?.replies?.map((reply) => (
                  <CommentBlock
                    key={reply?.id}
                    isChild
                    data={reply}
                    fetch={fetch}
                    setFetch={setFetch}
                    pathname={pathname}
                  />
                ))}
                {/* child comment add */}
                {isAddReply?.id === item?.id && (
                  <CommentBlock
                    user={user}
                    questionId={id}
                    parentId={item?.id}
                    addChild
                    setIsAddReply={setIsAddReply}
                    fetch={fetch}
                    setFetch={setFetch}
                    pathname={pathname}
                  />
                )}
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
        pathname={pathname}
      />
    </>
  );
}
export default CommentSection;

const CommentBlock = ({
  isParent,
  isChild,
  data,
  addChild,
  user,
  setIsAddReply,
  questionId,
  parentId,
  fetch,
  setFetch,
  pathname,
}) => {
  // comment reply post start =====================================
  const { register, handleSubmit, reset } = useForm();
  let pageName = getPageName(pathname);
  pageName =
    pageName === "multiple_answers" || pageName === "single_answer"
      ? "multi_choice"
      : pageName;
  const onSubmit = async (data) => {
    const replyData = {
      [pageName]: questionId,
      parent: parentId,
      body: data?.body,
    };
    const res = await axios.post(
      `https://api.codebyamirus.link/${pageName}/discussion`,
      replyData
    );
    reset();
    setIsAddReply({ state: false, id: null });
    setFetch(!fetch);
    toast.success("successfully added reply");
  };
  // comment reply post End =====================================

  // delete reply start ===============================================
  const handelDelete = async (id) => {
    const res = await axios.delete(
      `https://api.codebyamirus.link/discussion/${id}`
    );
    setFetch(!fetch);
    toast.success(res?.data?.message);
  };
  // delete reply end ===============================================

  // comment like start ===============================================
  const handelLike = async (id) => {
    const res = await axios.get(
      `https://api.codebyamirus.link/discussion/${id}/like`
    );
    setFetch(!fetch);
    toast.success(res?.data?.message);
  };
  // comment like end ===============================================

  return (
    <div className="flex items-center justify-between gap-x-3">
      <div className="flex-grow flex items-center gap-x-2">
        <p className="text-3xl w-10 h-10 flex items-center justify-center text-gray rounded-full border border-primary capitalize">
          {data?.user?.full_name?.charAt(0) || user?.full_name?.charAt(0)}
        </p>
        <div className="w-full">
          <h2 className="text-sm text-gray flex items-center gap-x-8">
            {data?.user?.full_name || user?.full_name}
            <p className="flex items-center gap-x-3">
              <span>
                {data?.created_at
                  ? formatDateTime(data?.created_at, "time")
                  : formatDateTime(new Date(), "time")}
              </span>
              <span>
                {data?.created_at
                  ? formatDateTime(data?.created_at, "date")
                  : formatDateTime(new Date(), "date")}
              </span>
            </p>
          </h2>
          {isParent || isChild ? (
            <p className="text-sm text-[#949494]">{data?.body}</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("body", { required: true })}
                type="text"
                className="w-full placeholder:text-[#ACACAC] placeholder:italic text-gray text-sm border border-x-0 border-t-0 border-b-primary outline-none focus:ring-transparent focus:border-primary p-0 m-0"
                placeholder="Write Comment Here......."
              />
            </form>
          )}
        </div>
      </div>
      {/* like delete */}
      <div className="flex items-center gap-x-4">
        {isParent && (
          <p className="flex items-end gap-x-2">
            <BiComment
              onClick={() => setIsAddReply({ state: true, id: data?.id })}
              className="text-cream text-xl cursor-pointer"
            />
            <span className="text-gray text-xs">{data?.replies?.length}</span>
          </p>
        )}
        {(isParent || isChild) && (
          <button
            disabled={data?.self_like === false}
            className="flex items-end gap-x-2"
          >
            <BiLike
              onClick={() => handelLike(data?.id)}
              className="text-cream text-xl cursor-pointer"
            />
            <span className="text-gray text-xs">{data?.like?.length}</span>
          </button>
        )}
        {(isParent || isChild || addChild) && (
          <BiSolidTrashAlt
            onClick={() => {
              addChild && setIsAddReply({ state: false, id: null });
              (isParent || isChild) && handelDelete(data?.id);
            }}
            className="text-primary text-xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

const AddCommentModal = ({ open, setOpen, fetch, setFetch, pathname }) => {
  const [commentType, setCommentType] = useState("Discuss");
  const allCommentType = [
    { name: "Discuss" },
    { name: "New Question" },
    { name: "New Error" },
  ];
  // post comment
  const { register, handleSubmit, reset } = useForm();
  let pageName = getPageName(pathname);
  pageName =
    pageName === "multiple_answers" || pageName === "single_answer"
      ? "multi_choice"
      : pageName;
  const onSubmit = async (data) => {
    const FormData = {
      [pageName]: open?.id,
      body: data?.body,
      images: data?.images[0],
      type: commentType,
    };
    const res = await axios.post(
      `https://api.codebyamirus.link/${pageName}/discussion`,
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
