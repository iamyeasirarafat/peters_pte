"use client";
import React, { useState } from "react";

export default function Multiple_choice_single() {
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex gap-8">
      {/* question */}
      <p className="w-3/4">
        After nearly four centuries of fragmentation, a powerful secular leader
        arose who was able to unite all of Europe for a time. Charlemagne (742-
        814 CE), the descendent of Frankish kings, who inherited the lands of
        Francia (present-day France, Belgium, the Netherlands, Austria,
        Switzerland, Denmark, and portions of Germany) viewed himself as
        successor to the emperors of ancient Rome. Like a Roman emperor, he
        waged incessant war, increasing the borders of his territories in all
        directions until the Carolingian empire stretched 800 miles from east to
        west. From his court in Aachen he commissioned building and artistic
        projects, issued laws, and received ambassadors from as far away as
        Constantinople and Baghdad. However, there were some important
        differences between this emperor and those of antiquity.
      </p>

      {/* header */}
      <div>
        <p className="font-semibold">
          Read the text and answer the multiple choice question by selecting the correct response. Only one response is correct.
        </p>

        <div className="flex flex-col">
          <p className="my-5">
            In what ways was Charlemagne similar to earlier Roman emperors?
          </p>
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="option1"
                name="option"
                value="option1"
                checked={selectedOption === "option1"}
                onChange={() => handleOptionChange("option1")}
              />
              <label htmlFor="option1">He waged war and expanded his empire.</label>
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
              <label htmlFor="option2">He built a new capital city.</label>
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
              <label htmlFor="option3">He received ambassadors from other countries.</label>
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
              <label htmlFor="option4">He was a descendent of Frankish kings.</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
