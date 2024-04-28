"use client";
import React from "react";
import RecordBlock from "./RecordBlock";

export default function Record_Missing_words() {
  return (
    <div>
      <p className="font-semibold mb-6">
        You will hear a recording. Please listen to the recording and type the
        missing words in each blank.
      </p>
      <div className="mb-6">
        <RecordBlock />
      </div>
      <AppropriateChoiceBlock />
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
  );
};
