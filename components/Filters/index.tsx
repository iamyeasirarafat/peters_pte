
import { useState } from "react";
import Icon from "../Icon";
import Search from "../Search";

type FiltersProps = {};

const FilterTab = [
  { name: "Most Active Student" },
  { name: "Most Inactive Student" },
  { name: "Top Scorer" },
  { name: "Low Scorer" },
];

const Filters = ({ }: FiltersProps) => {
  const [activeTab, setActiveTab] = useState("Most Active Student");
  return (
    <div className="flex md:flex-wrap gap-x-[2px] mb-[2px]">
      {FilterTab?.map((tab: any, i: number) => (
        <button
          key={i}
          onClick={() => setActiveTab(tab?.name)}
          className={`${tab?.name === activeTab
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


export const StudentFilter = () => {
  const filtersChoice = ["All Groups"];

  type FiltersProps = {};

  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex mb-6 md:flex-wrap">
      <button className="btn-purple btn-small">
        <Icon name="filters" />
        <span> Filters</span>
      </button>
      <div className="flex flex-wrap md:order-3 md:mt-3 md:-ml-3">
        {filtersChoice.map((item, index) => (
          <div className="flex items-center ml-3 text-xs font-bold" key={index}>
            <button className="group -mt-0.5 mr-1">
              <Icon
                className="transition-colors dark:fill-white group-hover:fill-pink-1"
                name="close"
              />
            </button>
            {item}
          </div>
        ))}
      </div>
      <Search
        className="ml-auto md:w-[64%]"
        placeholder="Search"
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        onSubmit={() => console.log("Submit")}
      />
    </div>
  )
}