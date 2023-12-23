import Sorting from "@/components/Sorting";
import { useHydrated } from "@/hooks/useHydrated";
import { useMediaQuery } from "react-responsive";
import Item from "./Item";
import StudentRow from "./Row";
import { useState } from "react";

const Students = ({ items, setStatus, admin }) => {
  const [isOpen, setIsOpen] = useState(null);
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

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
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Students;
