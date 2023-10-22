import Checkbox from "@/components/Checkbox";
import Sorting from "@/components/Sorting";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Item from "./Item";
import Row, { StudentRow } from "./Row";

import { useHydrated } from "@/hooks/useHydrated";


const Students = ({ items, student }) => {
  const [valueAll, setValueAll] = useState(false);
  const { mounted } = useHydrated();

  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  return mounted && isTablet ? (
    <div className="bg-white dark:bg-black">
      {items.map((product, i) => (
        <Item item={product} key={i} />
      ))}
    </div>
  ) : (
    <table className="bg-white dark:bg-black">
      <thead>
        <tr>
          <th className="th-custom">
            <Checkbox
              value={valueAll}
              onChange={() => setValueAll(!valueAll)}
            />
          </th>
          <th className="th-custom">
            <Sorting title="Student Name" />
          </th>
          <th className="th-custom">
            <Sorting title="Account Plan" />
          </th>
          <th className="th-custom">
            <Sorting title="User Id" />
          </th>
          <th className="th-custom">
            <Sorting title="Last Logged In" />
          </th>
          <th className="th-custom">
            <Sorting title="Average Score" />
          </th>
          <th className="th-custom text-right">
            <Sorting title="Group" />
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((product, i) => {
          if (student) {
            return <StudentRow item={product} key={i} />
          } else {
            return <Row item={product} key={i} />
          }
        }

        )}
      </tbody>
    </table>
  );
};

export default Students;
