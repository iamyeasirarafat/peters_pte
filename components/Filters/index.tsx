import { useState } from "react";

type FiltersProps = {};

const FilterTab = [
  { name: "Most Active Student" },
  { name: "Most Inactive Student" },
  { name: "Top Scorer" },
  { name: "Low Scorer" },
];

const Filters = ({}: FiltersProps) => {
  const [activeTab, setActiveTab] = useState("Most Active Student");
  return (
    <div className="flex md:flex-wrap gap-x-[2px] mb-[2px]">
      {FilterTab?.map((tab: any, i: number) => (
        <button
          key={i}
          onClick={() => setActiveTab(tab?.name)}
          className={`${
            tab?.name === activeTab
              ? "bg-primary text-white dark:bg-[#2c2620]"
              : "bg-white text-black dark:bg-black dark:text-white"
          } py-3 px-5 text-xs font-bold`}
        >
          {tab?.name}
        </button>
      ))}
    </div>
  );
};

export default Filters;
