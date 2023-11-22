import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import Sorting from "@/components/Sorting";
import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import { useState } from "react";
import { useHydrated } from "@/hooks/useHydrated";
import { useMediaQuery } from "react-responsive";
import { AiFillPlusCircle } from "react-icons/ai";

function Index() {
  const router = useRouter();
  const { mocktest_List } = router.query;
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  return (
    <Layout title={mocktest_List?.replace(/_/g, " ")} back>
      <div>
        <button className="flex items-center gap-x-2 text-sm font-bold py-2 px-3 bg-primary">
          <AiFillPlusCircle />
          Create New Question
        </button>
      </div>
      {mounted && isTablet ? <MocktestLisMobile /> : <MocktestList />}
    </Layout>
  );
}

export default Index;

const MocktestList = () => {
  const [value, setValue] = useState(false);
  return (
    <div className="mt-4">
      <table className="bg-white dark:bg-black w-full">
        <thead>
          <tr>
            <th className="th-custom flex items-center gap-x-4 min-w-[400px]">
              <Checkbox value={value} onChange={() => setValue(!value)} />
              <Sorting title="Question Name" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="Question Id" />
            </th>
            <th className="th-custom flex items-center justify-end gap-x-3">
              <Sorting title="Upload Date" />
              <button className="btn-transparent-dark btn-small btn-square">
                <Icon name="dots" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <MocktestListRow />
        </tbody>
      </table>
    </div>
  );
};
const MocktestListRow = () => {
  const [value, setValue] = useState(false);
  return (
    <tr>
      <td className="td-custom flex items-center gap-x-4">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <p className="text-sm font-bold">Bill on the hill</p>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm">#7250589</p>
      </td>
      <td className="td-custom flex items-center justify-end gap-x-3">
        <p className="text-sm">05/07/23</p>
        <button className="btn-transparent-dark btn-small btn-square">
          <Icon name="dots" />
        </button>
      </td>
    </tr>
  );
};

const MocktestLisMobile = () => {
  return (
    <div className="bg-white dark:bg-black p-4 mt-4">
      <div className="flex items-center justify-between">
        <p className="text-sm">05/10/23</p>
        <button className="btn-transparent-dark btn-small btn-square">
          <Icon name="dots" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">Bill in the Hill</p>
        <p className="text-sm">#c782200004582</p>
      </div>
    </div>
  );
};
