import Checkbox from "@/components/Checkbox";
import Sorting from "@/components/Sorting";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Item from "./Item";
import Row from "./Row";

import { useHydrated } from "@/hooks/useHydrated";

type ProductsProps = {
  items: any;
};

const Products = ({ items }: ProductsProps) => {
  const [valueAll, setValueAll] = useState<boolean>(false);
  const { mounted } = useHydrated();

  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  return mounted && isTablet ? (
    <div className="card">
      {items.map((product: any) => (
        <Item item={product} key={product.id} />
      ))}
    </div>
  ) : (
    <table className="table-custom table-select">
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
            <Sorting title="Account plan" />
          </th>
          <th className="th-custom">
            <Sorting title="User Id" />
          </th>
          <th className="th-custom">
            <Sorting title="Last Logged in" />
          </th>
          <th className="th-custom">
            <Sorting title="Average Score" />
          </th>
          <th className="th-custom text-right">
            <Sorting title="Group" />
          </th>

          <th className="th-custom text-right"></th>
        </tr>
      </thead>
      <tbody>
        {items.map((product: any) => (
          <Row item={product} key={product.id} />
        ))}
      </tbody>
    </table>
  );
};

export default Products;
