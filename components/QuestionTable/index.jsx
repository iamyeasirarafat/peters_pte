import Checkbox from "@/components/Checkbox";
import Sorting from "@/components/Sorting";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Item from "./Item";
import Row, { StudentRow } from "./Row";
import Icon from "@/components/Icon";

const Students = ({ items, student }) => {
  const [valueAll, setValueAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <table className="bg-white dark:bg-black w-full">
      <thead className="overflow-x-scroll">
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
          <th className="">
            <Sorting title="Question Id" />
          </th>
          <th className="th-custom">
            <Sorting title="Appeared No." />
          </th>
          <th className="">
            <Sorting title="Prediction" />
          </th>
          <th className="">
            <Sorting title="Upload Date" />
          </th>
          <th className="td-custom text-right">
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
                } origin-top-right absolute right-0 z-3 mt-1 w-52 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <div role="none">
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
          </th>
          {/* <th className="th-custom text-right">
            <Sorting title="..." />
          </th> */}
        </tr>
      </thead>
      <tbody className="overflow-x-scroll">
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
