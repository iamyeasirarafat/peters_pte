import Sorting from "@/components/Sorting";
import { useHydrated } from "@/hooks/useHydrated";
import { useMediaQuery } from "react-responsive";
import Item from "./Item";
import StudentRow from "./Row";
import { useState } from "react";
import Icon from "@/components/Icon";
import { multiDeleteList } from "@/utils/multiDeleteList";
import toast, { LoaderIcon } from "react-hot-toast";
import { PiTrash } from "react-icons/pi";
import Loading from "@/components/Loading";

const Students = ({ items, setStatus, admin }) => {
  const [deleteUserList, setDeleteUserList] = useState([]);
  const [openMultiActions, setOpenMultiActions] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  return mounted && isTablet ? (
    <div className="bg-white dark:bg-white/20 w-full">
      {items?.map((product, i) => (
        <Item
          item={product}
          key={i}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setStatus={setStatus}
        />
      ))}
    </div>
  ) : (
    <table className="bg-white dark:bg-white/20 w-full">
      <thead>
        <tr>
          <th className="th-custom">
            <Sorting title="Student Name" />
          </th>
          <th className="th-custom text-center">
            <Sorting title="Account Plan" />
          </th>
          <th className="th-custom text-center">
            <Sorting title="User Id" />
          </th>
          <th className="th-custom text-center">
            <Sorting title="Last Logged In" />
          </th>
          <th className="th-custom text-center">
            <Sorting title="Average Score" />
          </th>
          {admin && (
            <th className="th-custom text-center ">
              <Sorting title="Organization" />
            </th>
          )}
          <th className="th-custom text-right">
            <Sorting title="Group" />
          </th>
          <th className="th-custom text-center">
            {deleteUserList?.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setOpenMultiActions(!openMultiActions)}
                  className="btn-transparent-dark btn-small btn-square"
                >
                  <Icon name="dots" />
                </button>
                {openMultiActions && (
                  <MultiActions
                    type="User"
                    deleteUserList={deleteUserList}
                    setDeleteUserList={setDeleteUserList}
                    setOpenMultiActions={setOpenMultiActions}
                    setStatus={setStatus}
                  />
                )}
              </div>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {items?.map((product, i) => {
          return (
            <StudentRow
              admin={admin}
              setStatus={setStatus}
              item={product}
              key={i}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setDeleteUserList={setDeleteUserList}
              deleteUserList={deleteUserList}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Students;

export const MultiActions = ({
  type,
  deleteUserList,
  setDeleteUserList,
  setOpenMultiActions,
  setStatus,
  onlyDelete,
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  // handle multi delete
  const handleMultiDelete = async (incDec, action) => {
    try {
      setLoadingDelete(true);
      const res = await multiDeleteList(type, deleteUserList, incDec, action);
      toast.success(res?.message);
      setDeleteUserList([]);
      setOpenMultiActions(false);
      setStatus((prev) => !prev);
    } catch (error) {
      toast.error("Something went wrong!");
      setLoadingDelete(false);
    }
  };

  return (
    <div
      className={`absolute z-50 top-1/2 right-[70%] bg-secondary dark:bg-white/20 p-1 rounded-md ${
        onlyDelete ? "w-[230px]" : "w-[120px]"
      }`}
    >
      {onlyDelete && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMultiDelete("increase", "appeared");
            }}
            disable={loadingDelete}
            className="block disabled:cursor-not-allowed px-4 py-2 text-sm text-gray-700  dark:text-gray-700 hover:bg-gray-100 hover:text-gray"
          >
            <Icon name="plus" /> Increase Appeared by 1
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMultiDelete("decrease", "appeared");
            }}
            disable={loadingDelete}
            className="block disabled:cursor-not-allowed px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray"
          >
            <Icon name="plus" /> Decrease Appeared by 1
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMultiDelete("on", "prediction");
            }}
            disable={loadingDelete}
            className="block disabled:cursor-not-allowed px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray"
          >
            <Icon name="prediction" /> Prediction On
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleMultiDelete("off", "prediction");
            }}
            disable={loadingDelete}
            className="block disabled:cursor-not-allowed px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray"
          >
            <Icon name="predictionOff" /> Prediction Off
          </button>
        </>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleMultiDelete();
        }}
        disable={loadingDelete}
        className="flex disabled:cursor-not-allowed items-center gap-x-2 px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-red"
      >
        <PiTrash /> Remove
      </button>
      {loadingDelete && (
        <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loading />
        </div>
      )}
    </div>
  );
};
