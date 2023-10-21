import { useState } from "react";
import Link from "next/link";
import Checkbox from "@/components/Checkbox";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type RowProps = {
  item: any;
};

const Row = ({ item }: RowProps) => {
  const [value, setValue] = useState<boolean>(false);

  return (
    <tr className="">
      <td className="td-custom">
        <Checkbox value={value} onChange={() => setValue(!value)} />
      </td>
      <td className="td-custom">
        <div className="flex items-center gap-x-2">
          <Image
            className="w-10 h-10 rounded-full"
            src={item.image}
            width={42}
            height={42}
            alt=""
          />
          <p className="text-sm font-semibold">{item?.name}</p>
        </div>
      </td>
      <td className="td-custom">
        <div className="label-stroke min-w-[7.25rem]">{item.accountPlan}</div>
      </td>
      <td className="td-custom">{item.userId}</td>
      <td className="td-custom">{item.lastLoggedIn}</td>
      <td className="td-custom">
        <div
          className={`min-w-[4rem] ${
            item.averageScore >= "80"
              ? "label-stroke-green"
              : item.averageScore >= "70"
              ? "label-stroke-yellow"
              : item.averageScore >= "60"
              ? "label-stroke-pink"
              : "label-stroke"
          }`}
        >
          {item.averageScore}/90
        </div>
      </td>
      <td className="td-custom text-right">{item.group}</td>
      <td className="td-custom text-right">
        <button className="btn-transparent-dark btn-small btn-square">
          <Icon name="dots" />
        </button>
      </td>
    </tr>
  );
};

export default Row;
