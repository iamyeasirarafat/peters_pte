import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import { useState } from "react";
const MultipleChoiceListing = () => {
  const [optionNumber, setOptionNumber] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    paragraph: "",
    appeared: 0,
    prediction: false,
  });
  const handleInputChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const [audioSrc, setAudioSrc] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioSrc(URL.createObjectURL(file));
      setAudioName(file?.name);
    } else {
      setAudioSrc(null);
      setAudioName(null);
    }
  };

  const handleDeleteAudio = () => {
    setAudioSrc(null);
    setAudioName(null);
  };

  const options = [
    { label: "A" },
    { label: "B" },
    { label: "C" },
    { label: "D" },
  ];
  const [value, setValue] = useState(false);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between">
            <label for="name" className="font-bold text-sm">
              Question Name
            </label>
            <h3 className="text-sm font-semibold">Question Id #785263891</h3>
          </div>
          <input
            placeholder="Bill On The Hill"
            className="w-full border-none py-4 px-5 text-sm "
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <h4 className="text-sm mt-5 mb-2 font-semibold">Sentence Voice</h4>
          {!audioName && !audioSrc ? (
            <label class=" border w-28 flex flex-col items-center px-4 py-6  cursor-pointe">
              <Icon
                className="icon-20 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                name="upload"
              />
              <span class="mt-2 text-base leading-normal">Upload</span>
              <input
                type="file"
                class="hidden"
                accept="audio/*"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="flex gap-5">
              <div class="border relative w-28 flex flex-col items-center  cursor-pointer">
                <div onClick={handleDeleteAudio} class="absolute top-0 right-0">
                  <Icon
                    class="icon-20 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                    name="cross"
                  />
                </div>
                <Icon
                  className="icon-20 mt-5 fill-n-1 transition-colors dark:fill-white group-hover:fill-purple-1"
                  name="pause"
                />
                <span class="mt-2 px-3 pb-2 max-w-full overflow-hidden truncate whitespace-no-wrap">
                  {audioName}
                </span>
              </div>
              <div className="w-full">
                <audio controls src={audioSrc} className="w-full   p-2"></audio>
              </div>
            </div>
          )}
        </div>

        {/* more field */}
        <div className="flex justify-between gap-6 mt-5">
          <Counter
            className="bg-white w-1/2"
            title="Option Number"
            value={optionNumber}
            setValue={(value) => setOptionNumber(value)}
          />
          <div className="w-1/2  bg-white flex items-center pl-4">
            <div className="grid grid-cols-4">
              {options?.map((option, i) => (
                <label
                  key={i}
                  className={`group relative inline-flex items-start select-none cursor-pointer tap-highlight-color bg-white  py-3 pl-3 pr-12`}
                >
                  <input
                    className="absolute top-0 left-0 opacity-0 invisible"
                    type="checkbox"
                    value={value}
                    onChange={() => setValue(option.label)} // Update the selected value
                    checked={value === option.label}
                  />
                  <span
                    className={`relative flex justify-center items-center shrink-0 w-5 h-5 border transition-colors dark:border-white group-hover:border-green-1 ${
                      value == option.label
                        ? "bg-green-1 border-green-1 dark:!border-green-1"
                        : "bg-transparent border-n-1 dark:border-white"
                    }`}
                  >
                    <Icon
                      className={`fill-white transition-opacity ${
                        value == option.label ? "opacity-100" : "opacity-0"
                      }`}
                      name="check"
                    />
                  </span>
                  <span className="ml-2.5 pt-0.75 text-xs font-bold text-n-1 dark:text-white">
                    {option?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 my-6 gap-3">
          {options?.map((option, i) => (
            <div key={i}>
              <h3 className="font-semibold text-sm mb-2">
                Option {option.label}
              </h3>
              <textarea
                rows={5}
                placeholder="Start Typing..."
                className="w-full border-none py-4 px-5 text-sm "
                id="paragraph"
                type="text"
                value={formData.paragraph}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-6">
          <Counter
            className="bg-white w-1/2"
            title="Appeared Times"
            value={formData.appeared}
            setValue={(value) => setFormData({ ...formData, appeared: value })}
          />
          <div className="w-1/2  bg-white flex items-center pl-4">
            <input
              id="prediction"
              type="checkbox"
              className="text-green-500 focus-visible:outline-none"
              checked={formData.prediction}
              onChange={handleInputChange}
            />
            <label for="prediction" className="text-sm font-bold ml-2">
              Prediction
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="h-10 w-full mt-5 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
        >
          Create Question
        </button>
      </form>
    </div>
  );
};

export default MultipleChoiceListing;