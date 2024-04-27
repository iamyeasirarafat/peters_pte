"use client";
import React, { useState } from "react";

export default function Multiple_answers() {
  const [options, setOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
  });
  const handleOptionChange = (option) => {
    setOptions({ ...options, [option]: !options[option] });
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
        differences between this emperor and those of antiquity. Though he
        understood Latin and Greek, Charlemagne could neither read nor write. He
        proudly wore Frankish trousers and personally supervised his entire
        empire, galloping back and forth on horseback. He commanded no standing
        army; rather his subjects had to be mobilized for each campaign,
        providing their run wenang.
      </p>

      {/* header */}
      <div>
        <p className="font-semibold">
          Read the text and answer the question by selecting all the correct
          responses. You will need to select more than one response.
        </p>

        <div className="flex flex-col">
          <p className="my-5">
            In what ways was Charlemagne similar to earlier Roman emperors?
          </p>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.option1}
                onChange={() => handleOptionChange("option1")}
              />
              He was constantly protected by his soldiers.
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.option2}
                onChange={() => handleOptionChange("option2")}
              />
              He had diplomatic links with other countries.
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.option3}
                onChange={() => handleOptionChange("option3")}
              />
              He was highly educated.
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.option4}
                onChange={() => handleOptionChange("option4")}
              />
              He expanded his empire.
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.option5}
                onChange={() => handleOptionChange("option5")}
              />
              He wore traditional imperial dress.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
