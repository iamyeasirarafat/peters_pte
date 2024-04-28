"use client";
import React, { useState } from "react";

export default function Highlight_correct_summary() {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="">
      {/* header */}
      <div>
        <p className="font-semibold">
          You will hear a recording. Choose the paragraph that best relates to
          the recording.
        </p>

        <div className="flex flex-col">
          <div>
            {/* audio player  */}
            <div className="py-2 w-full">
              <audio controls className="w-full">
                <source src="horse.ogg" type="audio/ogg" />
                <source src="horse.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="option1"
                name="option"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={() => handleOptionChange("option1")}
              />
              <label htmlFor="option1">
                {/* paragraph 1 */}
                Charlemagne was a great king of the Franks. He was crowned
                Emperor of the Romans in 800. He was a great warrior and
                expanded his empire through conquest. He was a descendent of
                Frankish kings.
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="option2"
                name="option"
                value="option2"
                checked={selectedOption === "option2"}
                onChange={() => handleOptionChange("option2")}
              />
              <label htmlFor="option2">
                {/* paragraph 2 */}
                Charlemagne was a great king of the Franks. He was crowned
                Emperor of the Romans in 800. He was a great warrior and
                expanded his empire through conquest. He received ambassadors
                from other countries.
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="option3"
                name="option"
                value="option3"
                checked={selectedOption === "option3"}
                onChange={() => handleOptionChange("option3")}
              />
              <label htmlFor="option3">
                {/* paragraph 3 */}
                Charlemagne was a great king of the Franks. He was crowned
                Emperor of the Romans in 800. He was a great warrior and
                expanded his empire through conquest. He built a new capital
                city.
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="option4"
                name="option"
                value="option4"
                checked={selectedOption === "option4"}
                onChange={() => handleOptionChange("option4")}
              />
              <label htmlFor="option4">
                {/* paragraph 4 */}
                Charlemagne was a great king of the Franks. He was crowned
                Emperor of the Romans in 800. He was a great warrior and
                expanded his empire through conquest. He waged war and expanded
                his empire.
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
