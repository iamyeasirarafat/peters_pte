import Sorting from "@/components/Sorting";
import { useHydrated } from "@/hooks/useHydrated";
import { useMediaQuery } from "react-responsive";
import Item from "./Item";
import StudentRow from "./Row";
import { useState } from "react";
import Icon from "@/components/Icon";
import { BsTrash3 } from "react-icons/bs";
import { multiDeleteList } from "@/utils/multiDeleteList";
import toast, { LoaderIcon } from "react-hot-toast";

const Students = ({ items, setStatus, admin }) => {
  const [loadingDelate, setLoadingDelate] = useState(false);
  const [deleteUserList, setDeleteUserList] = useState([]);
  const [openMultiActions, setOpenMultiActions] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  // handel multi delete
  const handelMultiDelete = async () => {
    setLoadingDelate(true);
    const res = await multiDeleteList("User", deleteUserList);
    toast.success(res?.message);
    setStatus((prev) => !prev);
    setOpenMultiActions(false);
    setDeleteUserList([]);
    setLoadingDelate(false);
  };

  return mounted && isTablet ? (
    <div className="bg-white dark:bg-black w-full">
      {items?.map((product, i) => (
        <Item item={product} key={i} />
      ))}
    </div>
  ) : (
    <table className="bg-white dark:bg-black w-full">
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
            <div className="relative">
              <button
                onClick={() => setOpenMultiActions(!openMultiActions)}
                className="btn-transparent-dark btn-small btn-square"
              >
                <Icon name="dots" />
              </button>
              {openMultiActions && (
                <MultiActions
                  handelMultiDelete={handelMultiDelete}
                  loadingDelate={loadingDelate}
                />
              )}
            </div>
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

const MultiActions = ({ handelMultiDelete, loadingDelate }) => {
  return (
    <div className="absolute top-0 right-full bg-secondary p-1 rounded-md">
      <button
        onClick={(e) => {
          e.preventDefault();
          handelMultiDelete();
        }}
        className="flex items-center gap-x-2 px-4 py-2 hover:text-red duration-200 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      >
        {loadingDelate ? <LoaderIcon /> : <BsTrash3 />}
        Delete
      </button>
    </div>
  );
};
