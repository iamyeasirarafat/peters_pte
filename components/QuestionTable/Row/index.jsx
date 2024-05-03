import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { convertToCamelCase } from "..";

const Row = ({
  item,
  setDeleteUserList,
  deleteUserList,
  setIsOpen,
  isOpen,
  setReFetch,
}) => {
  const router = useRouter();
  const { questionTable } = router.query;
  const [value, setValue] = useState(false);
  useEffect(() => {
    if (deleteUserList && deleteUserList.includes(item.id)) {
      setValue(true);
    } else {
      setValue(false);
    }
  }, [item, deleteUserList]);

  const handleUpdateClick = (item) => {
    router.push({
      pathname: `/admin/practice-question/${questionTable}/edit`,
      query: { item: JSON.stringify(item) },
    });
  };

  return (
    <tr className="">
      <td className="td-custom">
        <div className="flex items-center gap-x-4">
          <Checkbox
            value={value}
            onChange={() => {
              setValue(!value);
              if (!value) {
                setDeleteUserList((prev) => [...prev, item.id]);
              } else {
                setDeleteUserList((prev) => prev.filter((i) => i !== item.id));
              }
            }}
          />
          <p className="text-sm font-semibold">{item?.title || item?.word}</p>
        </div>
      </td>
      <td className="td-custom text-center">
        <div className="label-stroke min-w-[7.25rem]">#{item?.id}</div>
      </td>
      <td className="td-custom text-center">{item?.appeared}</td>
      <td className="td-custom text-center">
        {item.prediction ? (
          <p className="text-orange-400 border-[1.5px] border-orange-400  flex justify-center py-1 rounded-1">
            prediction
          </p>
        ) : (
          <p className="text-slate-400 border-[1.5px] border-slate-400 flex justify-center py-1 rounded-1">
            none
          </p>
        )}
      </td>
      <td className="td-custom text-center">
        <div className="label-stroke min-w-[7.25rem]">
          {dayjs(item?.created_at).format("DD/MM/YYYY")}
        </div>
      </td>
      <td className="td-custom text-right">
        <div className="flex justify-end bg-gray-100 ">
          <div
            className="relative inline-block text-left"
            onClick={() => setIsOpen(isOpen === item?.id ? null : item?.id)}
          >
            <button
              disabled={deleteUserList?.length > 0}
              className={`btn-transparent-dark btn-small btn-square ${
                deleteUserList?.length > 0 && "cursor-not-allowed opacity-20"
              }`}
            >
              <Icon name="dots" />
            </button>
            {isOpen === item?.id && (
              <MoreButton
                handleUpdateClick={handleUpdateClick}
                item={item}
                setReFetch={setReFetch}
              />
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Row;

export const StudentRow = ({ item, setDeleteUserList, deleteUserList }) => {
  const [value, setValue] = useState(false);
  useEffect(() => {
    if (deleteUserList && deleteUserList.includes(item.id)) {
      setValue(true);
    } else {
      setValue(false);
    }
  }, [item, deleteUserList]);
  return (
    <tr className="">
      <td className="td-custom">
        <Checkbox
          value={value}
          onChange={() => {
            setValue(!value);
            if (!value) {
              setDeleteUserList((prev) => [...prev, item.id]);
            } else {
              setDeleteUserList((prev) => prev.filter((i) => i !== item.id));
            }
          }}
        />
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

const MoreButton = ({ handleUpdateClick, item, setReFetch }) => {
  const router = useRouter();
  const { questionTable } = router.query;
  const pageName = convertToCamelCase(questionTable);
  const handelAction = async (type, incDec, action) => {
    try {
      const res = incDec
        ? await axios.put(`/${type}/${action}/${incDec}`, {
            ids: [item?.id],
          })
        : await axios.delete(`/${type}/delete_many`, {
            data: {
              ids: [item?.id],
            },
          });
      toast.success(res.data.message);
      setReFetch((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`bg-secondary dark:bg-white/20 dark:border origin-top-right font-semibold absolute right-full top-1/2 z-3 mt-1 w-[230px] rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
    >
      <div role="none">
        <div
          onClick={() => handleUpdateClick(item)}
          className="cursor-pointer block px-4 py-2 hover:text-gray duration-200 text-sm text-gray-700"
        >
          <Icon name="settings" /> Edit Question
        </div>
        <button
          onClick={() => handelAction(pageName, "increase", "appeared")}
          className="block px-4 py-2 hover:text-gray duration-200 text-sm text-gray-700"
        >
          <Icon name="plus" /> Increase Appeared by 1
        </button>
        <button
          onClick={() => handelAction(pageName, "decrease", "appeared")}
          className="block px-4 py-2 hover:text-gray duration-200 text-sm text-gray-700"
        >
          <Icon name="plus" /> Decrease Appeared by 1
        </button>
        <button
          onClick={() => handelAction(pageName, "on", "prediction")}
          className="block px-4 py-2 hover:text-gray duration-200 text-sm text-gray-700"
        >
          <Icon name="prediction" /> Prediction On
        </button>
        <button
          onClick={() => handelAction(pageName, "off", "prediction")}
          className="block px-4 py-2 hover:text-gray duration-200 text-sm text-gray-700"
        >
          <Icon name="predictionOff" /> Prediction Off
        </button>
        <button
          onClick={() => handelAction(pageName)}
          className="block px-4 py-2 hover:text-red duration-200 text-sm text-gray-700"
        >
          <Icon name="cross" /> Remove
        </button>
      </div>
    </div>
  );
};
