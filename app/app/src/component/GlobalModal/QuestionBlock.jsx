import ButtonFill from "@/src/components/global/ButtonFill";
import ButtonOutline from "@/src/components/global/ButtonOutline";
import Image from "next/image";
import React from "react";

const QuestionBlock = () => {
  return (
    <div className="flex items-center justify-between border border-primary rounded-[13px] p-3">
      <h2 className="text-xl font-medium">Bill | #7250589</h2>
      <div className="flex items-center gap-x-10">
        <div className="space-x-2">
          <ButtonFill text="Prediction" bgColor={"cream"} textColor={"gray"} />
          <ButtonFill
            text="Practiced"
            count={"(4)"}
            bgColor={"primary"}
            textColor={"gray"}
          />
          <ButtonOutline
            text="Appeared"
            count={"(12)"}
            borderColor={"primary"}
            textColor={"gray"}
          />
        </div>
        <div className="space-x-5">
          <button>
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
          <button>
            <div className="w-[17px] h-[28px]">
              <div className="w-full h-full relative">
                <Image
                  className="object-cover"
                  src="/icons/bookmark_primary.svg"
                  fill
                  alt="bookmark"
                />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionBlock;
