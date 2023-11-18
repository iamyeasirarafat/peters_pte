import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import { formatDateTime } from "@/utils/formatDateTime";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const Row = ({ item }) => {
  const [value, setValue] = useState(false);
  return (
    <tr className="">
      <td className="td-custom flex items-center gap-x-3">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <Link
          className="inline-flex items-center text-sm font-bold transition-colors hover:text-primary"
          href={`/organization/student-details?id=${item.id}`}
        >
          <div className="w-11 h-11  mr-3 ">
            <Image
              className="w-full h-full  rounded-full"
              src={item.picture || "/images/img-2.jpg"}
              width={1000}
              height={1000}
              alt=""
            />
          </div>
          {item.full_name}
        </Link>
      </td>
      <td className="td-custom">
        <div className="label-stroke border min-w-[7.25rem]">
          {item.premium ? "Premium" : "Free"}
        </div>
      </td>
      <td className="td-custom">{item?.profile[0]?.userid}</td>
      <td className="td-custom">{formatDateTime(item.last_login, "date")}</td>
      <td className="td-custom">
        <div
          className={`border ${
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
      <td className="td-custom flex items-center gap-x-2">
        {item?.profile[0]?.group?.name}
        <button className="btn-transparent-dark btn-small btn-square">
          <Icon name="dots" />
        </button>
      </td>
    </tr>
  );
};

export default Row;

export const StudentRow = ({ item }) => {
  const [value, setValue] = useState(false);

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

      <td className="td-custom font-bold">{item?.profile[0].group}</td>
      <td className="td-custom">
        <button className="btn-transparent-dark btn-small btn-square">
          <Icon name="dots" />
        </button>
      </td>
    </tr>
  );
};
