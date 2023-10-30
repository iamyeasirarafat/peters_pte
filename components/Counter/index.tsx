import Icon from "@/components/Icon";
import { useState } from "react"; // Import useState from 'react'

type CounterProps = {
  className?: string;
  label?: string;
  title: string;
  value: number;
  setValue: any;
};

const Counter = ({
  className,
  label,
  title,
  value,
  setValue,
}: CounterProps) => {
  // Create local state for the value
  const [localValue, setLocalValue] = useState(value);

  const handleIncrement = () => {
    // Update the local value
    const newValue = localValue + 1;
    setLocalValue(newValue);

    // Update the parent component's value
    setValue(newValue);
  };

  const handleDecrement = () => {
    if (localValue > 0) {
      // Update the local value
      const newValue = localValue - 1;
      setLocalValue(newValue);

      // Update the parent component's value
      setValue(newValue);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="">
        {label && <div className="mb-3 text-xs font-bold">{label}</div>}
        <div className="flex items-center h-16 p-5 border-n-1 rounded-sm dark:border-white">
          <div className="mr-auto text-sm font-bold">{title}</div>
          <div className="flex items-center shrink-0 ml-4">
            <button
              className={`group ${
                localValue === 0 && "pointer-events-none opacity-80"
              }`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default form submission
                handleDecrement();
              }}
            >
              <Icon
                className="icon-18 transition-colors group-hover:fill-purple-2 dark:fill-white"
                name="minus-circle"
              />
            </button>
            <div className="min-w-[2.5rem] text-center text-xs font-bold">
              {localValue}
            </div>
            <button
              className="group"
              onClick={(e) => {
                e.preventDefault(); // Prevent default form submission
                handleIncrement();
              }}
            >
              <Icon
                className="icon-18 transition-colors group-hover:fill-purple-2 dark:fill-white"
                name="plus-circle"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
