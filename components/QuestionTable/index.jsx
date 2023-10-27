import Checkbox from "@/components/Checkbox";
import Sorting from "@/components/Sorting";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Item from "./Item";
import Row, { StudentRow } from "./Row";
import Icon from "@/components/Icon";

import { useHydrated } from "@/hooks/useHydrated";

const Students = ({ items, student }) => {
  const [valueAll, setValueAll] = useState(false);
  const { mounted } = useHydrated();

  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  return mounted && isTablet ? (
    <div className="bg-white dark:bg-black w-full">
      {items.map((product, i) => (
        <Item item={product} key={i} />
      ))}
    </div>
  ) : (
    <table className="bg-white dark:bg-black w-full">
      <thead>
        <tr>
          <th className="th-custom">
            <Checkbox
              value={valueAll}
              onChange={() => setValueAll(!valueAll)}
            />
          </th>
          <th className="th-custom">
            <Sorting title="Question Name" />
          </th>
          <th className="th-custom">
            <Sorting title="Question Id" />
          </th>
          <th className="th-custom">
            <Sorting title="Appeared No." />
          </th>
          <th className="th-custom">
            <Sorting title="Prediction" />
          </th>
          <th className="th-custom">
            <Sorting title="Upload Date" />
          </th>
          <th className="td-custom text-right">
            <button className="btn-transparent-dark btn-small btn-square">
              <Icon name="dots" />
            </button>
          </th>
          {/* <th className="th-custom text-right">
            <Sorting title="..." />
          </th> */}
        </tr>
      </thead>
      <tbody>
        {items.map((product, i) => {
          if (student) {
            return <StudentRow item={product} key={i} />;
          } else {
            return <Row item={product} key={i} />;
          }
        })}
      </tbody>
    </table>
  );
};

export default Students;
