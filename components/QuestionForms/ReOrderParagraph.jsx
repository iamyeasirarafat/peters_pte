import Counter from "@/components/Counter";
import LoadingButton from "@/components/LoadingButton";
import Icon from "@/components/Icon";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import toast from "react-hot-toast";

const ReOrderParagraph = () => {
  const [formData, setFormData] = useState({
    title: "",
    // paragraph: "",
    options: [],
    appeared: 0,
    prediction: false,
    answer_sequence: [],
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [optionNumber, setOptionNumber] = useState(4);
  const [options, setOptions] = useState(
    Array.from({ length: optionNumber }, (_, index) => ({
      index: String.fromCharCode(65 + index),
      value: "",
    }))
  );
  useEffect(() => {
    setOptions((prevOptions) => {
      return Array.from({ length: optionNumber }, (_, index) => {
        if (index < prevOptions.length) {
          return prevOptions[index];
        } else {
          return {
            index: String.fromCharCode(65 + index),
            value: "",
          };
        }
      });
    });
  }, [optionNumber]);
  const handleTextAreaChange = (index, value) => {
    const updatedData = [...options];
    updatedData[index] = { ...updatedData[index], value };
    setOptions(updatedData);
  };
  const handleInputChange = (e) => {
    const { id, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("reorder_paragraph", formData);
      toast.success("Create question successfully");
      if (response?.data) {
        router.back();
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      options: options,
      answer_sequence: options.map((op) => op?.index),
    }));
  }, [options]);
  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    const reorderedOptions = Array.from(options);
    const [movedOption] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, movedOption);
    setOptions(reorderedOptions);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col gap-2">
          <div className="flex justify-between">
            <label for="title" className="font-bold text-sm">
              Question Name
            </label>
            <h3 className="text-sm font-semibold">Question Id #785263891</h3>
          </div>
          <input
            placeholder="Bill On The Hill"
            className="w-full border-none py-4 px-5 text-sm dark:bg-white/20 "
            id="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        {/* <div className="flex flex-col gap-2 my-5">
          <label for="paragraph" className="font-bold text-sm">
            Question Paragraph
          </label>
          <textarea
            rows={5}
            placeholder="Start Typing..."
            className="w-full border-none py-4 px-5 text-sm dark:bg-white/20 "
            id="paragraph"
            type="text"
            value={formData.paragraph}
            onChange={handleInputChange}
          />
        </div> */}

        {/* more field */}
        <div className="flex justify-between gap-6 mt-5">
          <Counter
            className="bg-white w-1/2 dark:bg-white/20 "
            title="Option Number"
            value={optionNumber}
            setValue={(value) => setOptionNumber(value)}
          />
          <div className="w-1/2  bg-white flex items-center pl-4 dark:bg-white/20 ">
            <div>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="options" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex justify-start gap-4"
                    >
                      {options?.map((option, i) => (
                        <Draggable key={i} draggableId={i.toString()} index={i}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <label>
                                <span className="text-white font-bold px-3 py-2 bg-orange-300">
                                  {option?.index}
                                </span>
                              </label>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 my-6 gap-3">
          {[...options]
            .sort((a, b) => a.index.localeCompare(b.index))
            ?.map((option, i) => (
              <div key={i}>
                <h3 className="font-semibold text-sm mb-2">
                  Option {option.index}
                </h3>
                <textarea
                  rows={5}
                  placeholder="Start Typing..."
                  className="w-full border-none py-4 px-5 text-sm dark:bg-white/20 "
                  id="paragraph"
                  type="text"
                  value={option?.value}
                  onChange={(e) => handleTextAreaChange(i, e.target.value)}
                />
              </div>
            ))}
        </div>
        <div className="flex justify-between gap-6">
          <Counter
            className="bg-white w-1/2 dark:bg-white/20 "
            title="Appeared Times"
            value={formData.appeared}
            setValue={(value) => setFormData({ ...formData, appeared: value })}
          />
          <div className="w-1/2  bg-white flex items-center pl-4 dark:bg-white/20 ">
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
        {!loading ? (
          <button
            type="submit"
            className="h-10 w-full mt-5 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
          >
            Create Question
          </button>
        ) : (
          <LoadingButton />
        )}
      </form>
    </div>
  );
};

export default ReOrderParagraph;
