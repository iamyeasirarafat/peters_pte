import React from "react";
import { MdDragIndicator } from "react-icons/md";

export default function Missing_words() {
  return (
    <div>
      <p className="font-semibold mb-6">
        In the text below some words are missing. Drag words from the options below to the appropriate place in the text. To undo an answer choice, drag it back to the options.
      </p>
      <div className="border border-gray/10 flex flex-col gap-3">
        <AppropriateChoiceBlock />
        {/* options */}
        <div className="bg-gray/20 flex items-center justify-center gap-2 py-2">
          <span className="flex gap-2 items-center border border-gray/30 cursor-move py-1 px-3"><MdDragIndicator /> Success</span>
          <span className="flex gap-2 items-center border border-gray/30 cursor-move py-1 px-3"><MdDragIndicator /> Vitality</span>
          <span className="flex gap-2 items-center border border-gray/30 cursor-move py-1 px-3"><MdDragIndicator /> Choose</span>
        </div>
      </div>

    </div>
  );
}


const AppropriateChoiceBlock = () => {
  return (
    <div className=" p-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem perspiciatis
      dolor quibusdam quo earum, quasi necessitatibus officiis voluptas
      mollitia, velit minima.{" "}
      <input
        className="border border-dashed w-36 mr-2 border-gray-400"
        type="text"
      />
      Illo fuga expedita cupiditate doloribus deleniti minima commodi fugiat aut
      alias nam suscipit, libero obcaecati consectetur, ea ducimus eius in,
      similique non voluptatum.
      <input
        className="border border-dashed w-36 mr-2 border-gray-400"
        type="text"
      />{" "}
      Sit hic corporis perferendis consectetur, sed, placeat nihil totam quasi
      nemo dolore earum reprehenderit. Iure minima a id optio? Unde
      <input
        className="border border-dashed w-36 mr-2 border-gray-400"
        type="text"
      />{" "}
      corrupti officiis beatae maiores laudantium minima consequuntur pariatur
      rem. Molestias tempore illo, aliquam numquam asperiores dignissimos
      voluptatibus
      <input
        className="border border-dashed w-36 mr-2 border-gray-400"
        type="text"
      />{" "}
      vitae? Possimus similique hic dignissimos assumenda eum ea amet! Doloribus
      quisquam perspiciatis ex repellat consectetur ea explicabo
      <input
        className="border border-dashed w-36 mr-2 border-gray-400"
        type="text"
      />{" "}
      inventore? Dolor.
    </div>
  )
}