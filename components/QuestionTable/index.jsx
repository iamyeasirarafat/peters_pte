import Checkbox from "@/components/Checkbox";
import Sorting from "@/components/Sorting";
import { useState } from "react";
import Row, { StudentRow } from "./Row";
import Icon from "@/components/Icon";
import { MultiActions } from "../../components/Students_list/index";
import { useRouter } from "next/router";

export const convertToCamelCase = (inputString) => {
  const words = inputString.split("-");
  let capitalizedWords = words.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  let camelCaseString = capitalizedWords.join("");
  return camelCaseString;
};
const Students = ({ items, student, setReFetch }) => {
  const [deleteUserList, setDeleteUserList] = useState([]);
  const [openMultiActions, setOpenMultiActions] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { questionTable } = router.query;
  const pageName = convertToCamelCase(questionTable);
  return (
    <table className="bg-white dark:bg-white/20 w-full">
      <thead className="overflow-x-scroll">
        <tr>
          <th className="th-custom">
            <Sorting title="Question Name" />
          </th>
          <th className="th-custom text-center">
            <Sorting title="Question Id" />
          </th>
          <th className="th-custom text-center">
            <Sorting title="Appeared No." />
          </th>
          <th className="th-custom text-center">
            <Sorting title="Prediction" />
          </th>
          <th className="th-custom text-center">
            <Sorting title="Upload Date" />
          </th>
          <th className="td-custom text-right">
            {deleteUserList?.length > 0 && (
              <div
                className="relative inline-block text-left"
                onClick={() => setOpenMultiActions(!openMultiActions)}
              >
                <button className="btn-transparent-dark btn-small btn-square">
                  <Icon name="dots" />
                </button>
                {openMultiActions && (
                  <MultiActions
                    type={
                      pageName === "MultiChoiceReadingSingle"
                        ? "MultiChoiceReading"
                        : pageName === "MultiChoiceSingle"
                        ? "MultiChoice"
                        : pageName
                    }
                    deleteUserList={deleteUserList}
                    setDeleteUserList={setDeleteUserList}
                    setOpenMultiActions={setOpenMultiActions}
                    setStatus={setReFetch}
                    onlyDelete
                  />
                )}
              </div>
            )}
          </th>
        </tr>
      </thead>
      <tbody className="overflow-x-scroll">
        {items.map((product, i) => {
          if (student) {
            return (
              <StudentRow
                item={product}
                key={i}
                setDeleteUserList={setDeleteUserList}
                deleteUserList={deleteUserList}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setReFetch={setReFetch}
              />
            );
          } else {
            return (
              <Row
                item={product}
                key={i}
                setDeleteUserList={setDeleteUserList}
                deleteUserList={deleteUserList}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setReFetch={setReFetch}
              />
            );
          }
        })}
      </tbody>
    </table>
  );
};

export default Students;
