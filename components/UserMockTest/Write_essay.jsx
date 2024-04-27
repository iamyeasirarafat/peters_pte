import React from "react";

export default function Write_essay() {
  return (
    <div>
      <p className="font-semibold mb-6">
        You will have 20min to plan, write and revise an essay about the topic below. Your response will be
        judged on how well you develop a position, organize your ideas, present supporting details, and control
        the elements of standard written English. You should write 200-300 words.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
        illo dolor ea at impedit nesciunt distinctio enim aperiam commodi ullam
        placeat assumenda illum deserunt ipsum non, doloremque reprehenderit
        nobis? Corrupti ipsam dolorem consequuntur dolorum veritatis sunt ullam
        porro ipsam tempore culpa alias! Cum itaque eligendi autem delectus,
      </p>

      <div className="flex flex-col text-zinc-700 my-5">
        <div className="flex justify-between items-center bg-gray/20  rounded-t-sm">
          <div className="flex gap-6 pl-5 py-1 ">
            <button>Copy</button>
            <button>Cut</button>
            <button>Paste</button>
          </div>
          <div className="pr-5 py-1">0 Word(s)</div>
        </div>
        <textarea
          className="border border-gray-400 rounded-b-sm"
          name="essay"
          id="none"
          cols="30"
          rows="5"
          placeholder="write essay here"
        ></textarea>
      </div>
    </div>
  );
}
