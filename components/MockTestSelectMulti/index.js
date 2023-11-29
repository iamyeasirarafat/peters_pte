import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

const MockTestSelect = ({
  dataArray,
  label,
  selectedValue,
  setSelectedValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  function isSelected(value) {
    return selectedValue.find((el) => el.id === value.id) ? true : false;
  }

  function handleSelect(value) {
    if (!isSelected(value)) {
      const selectedPersonsUpdated = [
        ...selectedValue,
        dataArray.find((el) => el.id === value.id),
      ];
      setSelectedValue(selectedPersonsUpdated);
    } else {
      handleDeselect(value);
    }
    setIsOpen(true);
  }

  function handleDeselect(value) {
    const selectedPersonsUpdated = selectedValue.filter(
      (el) => el.id !== value.id
    );
    setSelectedValue(selectedPersonsUpdated);
    setIsOpen(true);
  }

  return (
    <div className="w-full">
      <Listbox
        as="div"
        className="space-y-3"
        value={selectedValue}
        onChange={(value) => handleSelect(value)}
        open={isOpen}
      >
        {() => (
          <>
            <Listbox.Label className="block text-xs font-semibold text-gray-700">
              {label && label}
            </Listbox.Label>
            <div className="relative text-black dark:text-white">
              <span className="inline-block w-full rounded-md shadow-sm">
                <Listbox.Button
                  className="cursor-pointer relative w-full bg-white dark:bg-black rounded-sm p-5 text-left transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  onClick={() => setIsOpen(!isOpen)}
                  open={isOpen}
                >
                  <span className="block truncate">
                    {selectedValue.length < 1
                      ? "Select question"
                      : `Selected question ${selectedValue.length}`}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="7"
                      viewBox="0 0 10 7"
                      fill="none"
                    >
                      <path
                        d="M1.17188 0.148438L5 3.97656L8.82812 0.148438L10 1.32031L5 6.32031L0 1.32031L1.17188 0.148438Z"
                        fill="#5F646D"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
              </span>

              <Transition
                unmount={false}
                show={isOpen}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="absolute mt-1 w-full rounded-md bg-[#e6e6e6] dark:bg-black z-50"
              >
                <Listbox.Options
                  onMouseLeave={() => setIsOpen(false)}
                  static
                  className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto content-scrollbar sm:text-sm sm:leading-5"
                >
                  {dataArray.map((item) => {
                    const selected = isSelected(item);
                    return (
                      <Listbox.Option key={item.id} value={item}>
                        {({ active }) => (
                          <div
                            className={`${
                              active ? "text-gray-900" : "text-gray-900"
                            } cursor-pointer select-none relative py-2 pl-8 pr-4`}
                          >
                            <span
                              className={`${
                                selected ? "font-semibold" : "font-normal"
                              } block truncate`}
                            >
                              {item?.title}
                            </span>
                            {selected && (
                              <span
                                className={`${
                                  active ? "text-white" : "text-blue-600"
                                } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                              >
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};
export default MockTestSelect;
