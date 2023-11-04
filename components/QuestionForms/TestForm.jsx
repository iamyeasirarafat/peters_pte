import { useState } from "react";

function TestForm() {
  let counterValue = 4;
  const [formData, setFormData] = useState(
    Array.from({ length: counterValue }, (_, index) => ({
      index: String.fromCharCode(65 + index),
      value: "",
    }))
  );

  console.log(formData);

  const handleInputChange = (index, value) => {
    const updatedData = [...formData];
    updatedData[index] = { ...updatedData[index], value };
    setFormData(updatedData);
  };
  console.log(formData);
  return (
    <div>
      {formData.map((data, index) => {
        return (
          <div key={index}>
            <button>{data.index}</button>
            <input
              type="checkbox"
              onChange={(e) => handleInputChange(index, e.target.checked)}
            />
            <textarea
              value={data.value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default TestForm;
