import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const Row = ({ item }) => {
  const [value, setValue] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <tr className="">
      <td className="td-custom">
        <Checkbox value={value} onChange={() => setValue(!value)} />
      </td>
      <td className="td-custom">
        <div className="flex items-center ">
          <p className="text-sm font-semibold">{item?.name}</p>
        </div>
      </td>
      <td className="td-custom">
        <div className="label-stroke min-w-[7.25rem]">{item.accountPlan}</div>
      </td>
      <td className="td-custom ">{item.userId}</td>
      <td className="td-custom">
        {item.lastLoggedIn ? (
          <p className="text-orange-300 border-[1.5px] border-orange-300  flex justify-center py-1 rounded-1">
            prediction
          </p>
        ) : (
          <p className="text-slate-300 border-[1.5px] border-slate-300 flex justify-center py-1 rounded-1">
            none
          </p>
        )}
      </td>
      <td className="td-custom">
        <div className="label-stroke min-w-[7.25rem]">{item.averageScore}</div>
      </td>
      <td className="td-custom text-right">
        <div className="flex justify-center bg-gray-100 ">
          <div
            className="relative inline-block text-left"
            onClick={toggleDropdown}
            // onBlur={closeDropdown}
          >
            <button className="btn-transparent-dark btn-small btn-square">
              <Icon name="dots" />
            </button>
            <div
              style={{ backgroundColor: "#FAF4F0" }}
              className={`${
                isOpen ? "block" : "hidden"
              } origin-top-right font-semibold absolute right-0 z-3 mt-1 w-52 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <div role="none">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="settings" /> Edit Question
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="plus" /> Increase Appeared by 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="prediction" /> Prediction On
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="predictionOff" /> Prediction Off
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="cross" /> Remove
                </a>
              </div>
            </div>
          </div>
        </div>
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
