import React from "react";

export default function Summarize_written() {
  return (
    <div>
      <p className="font-semibold mb-6">
        Read the passage below and summarize it using one sentence. Type your response in the box at the
        bottom of the screen. You have 10 minutes to finish this task. Your response will be judged on the
        quality of your writing and on how well your response presents the key points in the passage.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
        illo dolor ea at impedit nesciunt distinctio enim aperiam commodi ullam
        placeat assumenda illum deserunt ipsum non, doloremque reprehenderit
        nobis? Corrupti ipsam dolorem consequuntur dolorum veritatis sunt ullam
        voluptas et explicabo nisi inventore quisquam itaque, excepturi
        architecto recusandae nesciunt illo. Omnis voluptas aliquam nesciunt
        architecto? Quia, voluptatum? Rerum similique, explicabo sapiente sint
        voluptate, a tenetur ad veniam officiis, odit temporibus earum! Qui sunt
        commodi earum quis dolor veniam, nostrum similique obcaecati.
        Consequatur atque repudiandae facere error id explicabo quod commodi
        vitae culpa corrupti hic blanditiis perferendis quos eligendi, sint quo
        quasi inventore ducimus, velit dolores. Voluptatem temporibus delectus
        iusto vero, magnam molestiae harum? Id alias veniam necessitatibus velit
        aperiam eligendi aspernatur repudiandae nulla earum, minus, repellat,
        odio iure consequuntur quia veritatis! Tenetur quod mollitia, optio
        incidunt, quis corrupti in nisi accusamus dignissimos id, molestiae amet
        debitis quam ratione dicta blanditiis cupiditate vitae fugit harum unde!
        Accusantium, dolores? Suscipit facere debitis laudantium cupiditate
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
          name="summary"
          id="none"
          cols="30"
          rows="5"
          placeholder="write summary here"
        ></textarea>
      </div>
    </div>
  );
}
