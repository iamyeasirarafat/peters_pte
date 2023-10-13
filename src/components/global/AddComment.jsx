import React, { useState } from "react";
import TabButton from "./TabButton";
import { BiComment, BiLike, BiSolidTrashAlt } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import ReusableModal from "./ReusableModal";
import { GrClose } from "react-icons/gr";

function AddComment() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative border border-primary rounded-[15px] mt-12 py-2 px-6 space-y-2">
      {/* tab button */}
      <div className="flex items-center gap-x-2 absolute bottom-[101%] right-5">
        <TabButton
          src={"/icons/aplus.svg"}
          iconWidth={21}
          iconHeight={23}
          bgColor={"blue"}
          textColor={"white"}
        >
          My Score
        </TabButton>
        <TabButton
          src={"/icons/massage.svg"}
          iconWidth={22}
          iconHeight={22}
          bgColor={"cream"}
          textColor={"gray"}
        >
          Forum
        </TabButton>
        <TabButton
          src={"/icons/score.svg"}
          iconWidth={24}
          iconHeight={24}
          bgColor={"primary"}
          textColor={"gray"}
        >
          Community Score
        </TabButton>
      </div>
      {/*add comment  */}
      <button
        onClick={() => setOpen(true)}
        className="py-2 px-3 bg-primary text-gray text-base rounded-[15px] flex items-center gap-x-2"
      >
        Add comment <AiOutlinePlusCircle className="text-base" />
      </button>
      {/* comment wright*/}
      <div>
        <CommentBlock />
        <div className="pl-20">
          <CommentBlock isShow />
          <CommentBlock />
        </div>
      </div>
      <CommentModal open={open} setOpen={setOpen} />
    </div>
  );
}
export default AddComment;

const CommentBlock = ({ isShow }) => {
  return (
    <div className="p-3 flex items-center justify-between gap-x-3">
      <div className="flex-grow flex items-center gap-x-2">
        <p className="text-3xl w-10 h-10 flex items-center justify-center text-gray rounded-full border border-primary">
          T
        </p>
        <div className="w-full">
          <p className="text-sm text-gray flex items-center gap-x-4">
            Tushar Haider <span>01:13 PM 02/07/2023</span>
          </p>
          {isShow ? (
            <p className="text-sm text-[#949494]">Nice Comment Here</p>
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
          <BiComment className="text-cream text-xl" />
          <span className="text-gray text-xs">10</span>
        </p>
        <p className="flex items-end gap-x-2">
          <BiLike className="text-cream text-xl" />
          <span className="text-gray text-xs">22</span>
        </p>
        {isShow && <BiSolidTrashAlt className="text-primary text-xl" />}
      </div>
    </div>
  );
};

const CommentModal = ({ open, setOpen }) => {
  const [commentType, setCommentType] = useState("Discuss");
  const allCommentType = [
    { name: "Discuss" },
    { name: "New Question" },
    { name: "New Error" },
  ];
  return (
    <ReusableModal open={open} setOpen={setOpen} className="w-6/12">
      <div className="bg-white border border-primary rounded-[15px] w-[1100px] overflow-hidden">
        {/* modal header */}
        <div className="w-full bg-primary rounded-t-[15px] flex items-center justify-between px-3 py-2">
          <p className="text-white text-xl">#7250589</p>
          <p className="text-white text-xl">Add You Comment</p>
          <button
            onClick={() => setOpen(false)}
            className="w-7 h-7 rounded-full bg-white flex items-center outline-none justify-center"
          >
            <GrClose className="text-gray text-base" />
          </button>
        </div>
        {/* Modal content */}
        <div className="p-4">
          {/* <div className="bg-white border border-primary rounded-[15px] p-3">
            <p className="text-xl text-start">
              A report on inequality in the UK said last week that girls had
              better educational results than boys at 16, went to university in
              greater numbers and achieved better degrees once they got there.
              the report said.
            </p>
          </div> */}
          <textarea
            className="bg-white text-xl border border-primary rounded-[15px] p-3 w-full"
            rows="3"
            placeholder="Wright your comment"
          ></textarea>
          {/* comment type */}
          <div className="flex items-center gap-x-3 my-2.5">
            <p className="text-base text-gray">Your Comment Type:*</p>
            {allCommentType?.map((type, i) => (
              <button
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
              <input type="file" className="hidden" />
            </label>
          </div>
          {/* post comment */}
          <div className="flex justify-end mt-2.5">
            <button className="py-2 px-3 bg-primary text-gray text-base rounded-[15px] flex items-center gap-x-2">
              Post Comment <AiOutlinePlusCircle className="text-base" />
            </button>
          </div>
        </div>
      </div>
    </ReusableModal>
  );
};
