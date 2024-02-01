import Sorting from "@/components/Sorting";
import { useHydrated } from "@/hooks/useHydrated";
import { useMediaQuery } from "react-responsive";
import Item from "./Item";
import StudentRow from "./Row";
import { useState } from "react";
import Icon from "../Icon";
import { MultiActions } from "../Students_list";

const OrganizationList = ({ items, setStatus, admin }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [deleteUserList, setDeleteUserList] = useState([]);
  const [openMultiActions, setOpenMultiActions] = useState(false);
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  return mounted && isTablet ? (
    <div className="bg-white dark:bg-black w-full">
      {items.map((product, i) => (
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
    <table className="bg-white dark:bg-black w-full">
      <thead>
        <tr>
          <th className="th-custom">
            <Sorting title="Organization Name" />
          </th>

          <th className="th-custom">
            <Sorting title="User Id" />
          </th>
          <th className="th-custom">
            <Sorting title="Spent" />
          </th>
          <th className="th-custom">
            <Sorting title="Students" />
          </th>
          <th className="th-custom">
            <Sorting title="Mock Left" />
          </th>
          <th className="th-custom ">
            <Sorting title="Acc. Left" />
          </th>
          <th className="th-custom ">
            <Sorting title="Country" />
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
        {items.map((item, i) => {
          return (
            <StudentRow
              admin={admin}
              setStatus={setStatus}
              item={item}
              key={i}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              deleteUserList={deleteUserList}
              setDeleteUserList={setDeleteUserList}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default OrganizationList;
