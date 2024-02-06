import { Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const customStyles = {
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    padding: "12px 0px",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "#f2b277" : "white",
    "&:hover": {
      backgroundColor: "#f2b277",
      color: "white",
    },
  }),
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#faf4f0",
      color: "black",
      fontWeight: "500",
    };
  },
  multiValueLabel: (styles) => ({
    ...styles,
    color: "black",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "red",
    ":hover": {
      backgroundColor: "#f2b277",
      color: "white",
    },
  }),
};

const MockTestMultiSelector = ({
  options,
  control,
  placeholder,
  name,
  label,
}) => {
  // formate options here
  options = options?.map((item, i) => {
    return {
      ...item,
      label: item?.title,
      value: item?.id,
      index: i,
    };
  });
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-gray-700 py-2">
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={{ required: false }}
        render={({ field: { onChange, value, ref } }) => (
          <Select
            components={makeAnimated()}
            inputRef={ref}
            value={options?.filter((c) => value?.includes(c.value))}
            onChange={(val) => onChange(val.map((c) => c.value))}
            options={options}
            placeholder={placeholder}
            isMulti
            styles={customStyles}
          />
        )}
      />
    </div>
  );
};
export default MockTestMultiSelector;
