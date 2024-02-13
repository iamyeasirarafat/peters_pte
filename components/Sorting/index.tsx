import { useState } from "react";
import Icon from "@/components/Icon";

type SortingProps = {
  title: string;
};

const Sorting = ({ title }: SortingProps) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <button
      className={`group inline-flex items-center text-xs font-bold transition-colors hover:text-purple-2 ${
        active ? "text-purple-2" : ""
      }`}
      onClick={() => setActive(!active)}
    >
      {title}
    </button>
  );
};

export default Sorting;
