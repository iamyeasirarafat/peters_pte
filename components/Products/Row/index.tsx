import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";
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
        <Link
          className="inline-flex items-center text-sm font-bold transition-colors hover:text-primary"
          href={`/organization/student-details?id=${item.id}`}
        >
          <div className="w-15  mr-3 ">
            <Image
              className="w-full rounded-full"
              src={item.picture || "/images/img-2.jpg"}
              width={42}
              height={42}
              alt=""
            />
          </div>
          {item.full_name}
        </Link>
      </td>
      <td className="td-custom">
        <div className="label-stroke border border-n-1 min-w-[7.25rem]">
          {item.premium ? "premium" : "free"}
        </div>
      </td>
      <td className="td-custom">{item?.profile[0].userid}</td>
      <td className="td-custom">
        {dayjs(item.last_login).format("DD/MM/YYYY")}
      </td>
      <td className="td-custom">
        <div
          className={`min-w-[4rem] ${
            item.avl === "Paid"
              ? "label-stroke-green"
              : item.avl === "Med"
              ? "label-stroke-yellow"
              : item.avl === "Low"
              ? "label-stroke-pink"
              : "label-stroke"
          }`}
        >
          {item.avg_score || "N/A"}
        </div>
      </td>

      <td className="td-custom font-bold text-right">
        {item?.profile[0].group}
      </td>

      <td className="td-custom text-right">
        <button className="btn-transparent-dark btn-small btn-square">
          <Icon name="dots" />
        </button>
      </td>
    </tr>
  );
};

export default Row;
