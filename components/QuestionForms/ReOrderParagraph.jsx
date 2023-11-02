import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import { useRouter } from "next/router";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ReOrderParagraph = () => {
  const [optionNumber, setOptionNumber] = useState(0);
  const router = useRouter();
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
    router.back();
  };

  const [options, setOptions] = useState([
    { label: "A" },
    { label: "B" },
    { label: "C" },
    { label: "D" },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) return; // dropped outside the list

    const reorderedOptions = Array.from(options);
    const [movedOption] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, movedOption);

    // Update the state with the new order
    setOptions(reorderedOptions);
  };

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
        <div className="flex flex-col gap-2 my-5">
          <label for="paragraph" className="font-bold text-sm">
            Question Paragraph
          </label>
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

        {/* more field */}
        <div className="flex justify-between gap-6 mt-5">
          <Counter
            className="bg-white w-1/2"
            title="Option Number"
            value={optionNumber}
            setValue={(value) => setOptionNumber(value)}
          />
          <div className="w-1/2  bg-white flex items-center pl-4">
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
                                  {option?.label}
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

export default ReOrderParagraph;
