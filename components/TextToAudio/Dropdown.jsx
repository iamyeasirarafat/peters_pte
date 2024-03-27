import Icon from "@/components/Icon";
import { Listbox } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const Dropdown = ({ selectItem, setSelectItem, ListItem, defaultValue }) => {
    return (
        <div className={`relative`}>
            <Listbox value={selectItem} onChange={setSelectItem}>
                {({ open }) => (
                    <>
                        <Listbox.Button
                            className={twMerge(
                                `flex items-center w-full h-16 px-5 bg-white border-none rounded-sm text-sm text-n-1 font-bold outline-none transition-colors tap-highlight-color dark:bg-n-1 dark:border-white dark:text-white  ${open ? "border-purple-1 dark:border-purple-1" : ""
                                } `
                            )}
                        >
                            <span className="mr-auto truncate">
                                {selectItem ? (
                                    selectItem.label
                                ) : (
                                    <span className="text-n-2 dark:text-white/75">
                                        {defaultValue}
                                    </span>
                                )}
                            </span>
                            <Icon
                                className={`shrink-0 icon-20 ml-6 -mr-0.5 transition-transform dark:fill-white  ${open ? "rotate-180" : ""
                                    } `}
                                name="arrow-bottom"
                            />
                        </Listbox.Button>
                        <Listbox.Options
                            className={twMerge(
                                `absolute left-0 right-0 w-full mt-1 p-2 bg-white h-40 overflow-y-auto  border-n-3 rounded-sm shadow-lg dark:bg-n-1 dark:border-white  ${open ? "z-10" : ""
                                } `
                            )}
                        >
                            {ListItem.map((item, idx) => (
                                <Listbox.Option
                                    className={`flex items-start px-3 py-2 rounded-sm capitalize text-sm font-bold text-n-3 transition-colors cursor-pointer hover:text-n-1 ui-selected:!bg-n-3/20 ui-selected:!text-n-1 tap-highlight-color dark:text-white/50 dark:hover:text-white dark:ui-selected:!text-white  `}
                                    key={idx}
                                    value={item}
                                >
                                    {item.label}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </>
                )}
            </Listbox>
        </div>
    );
};
export default Dropdown;