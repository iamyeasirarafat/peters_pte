import Layout from "@/components/Layout";
import TablePagination from "@/components/TablePagination";
import Sorting from "@/components/Sorting";
import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import { useMediaQuery } from "react-responsive";
import { useHydrated } from "@/hooks/useHydrated";
import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

const Index = () => {
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  return (
    <Layout title="Prediction" back>
      <div className="mb-5">
        <button className="flex items-center gap-x-2 text-sm font-bold py-2 px-3 bg-primary">
          <AiFillPlusCircle />
          Create New Prediction
        </button>
      </div>
      {mounted && isTablet ? (
        <div className="bg-white dark:bg-black">
          <PredictionListMobile />
        </div>
      ) : (
        <PredictionList />
      )}

      <TablePagination />
    </Layout>
  );
};

export default Index;

const PredictionList = () => {
  const [value, setValue] = useState(false);
  return (
    <div className="bg-white dark:bg-black w-full">
      <div className="flex items-center justify-between p-3">
        <div className="w-full flex items-center gap-x-2">
          <Checkbox value={value} onChange={() => setValue(!value)} />
          <Sorting title="File Name" />
        </div>
        <div className="w-full flex items-center gap-x-6 justify-between">
          <Sorting title="File Id" />
          <Sorting title="Category" />
          <Sorting title="Upload Date" />
        </div>
      </div>
      <div>
        <AdminUserRow value={value} setValue={setValue} />
      </div>
    </div>
  );
};
const AdminUserRow = () => {
  const [value, setValue] = useState(false);
  return (
    <div className="flex items-center justify-between p-3">
      <div className="w-full flex items-center gap-x-2">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <p className="text-sm font-bold">Prediction File 25/07/23 - 28/07/24</p>
      </div>
      <div className="w-full flex items-center gap-x-6 justify-between">
        <p className="text-sm font-bold">#7250589</p>
        <p className="text-sm font-bold border border-black dark:border-white py-1 px-3 rounded-sm">
          Premium
        </p>
        <div className="flex items-center gap-x-5">
          <p className="text-sm font-bold">05/07/23</p>
          <button className="btn-transparent-dark btn-small btn-square">
            <Icon name="dots" />
          </button>
        </div>
      </div>
    </div>
  );
};

const PredictionListMobile = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center justify-between">
      <p className="text-sm font-bold border border-black dark:border-white py-1 px-3 rounded-sm">
        Premium
      </p>
      <button className="btn-transparent-dark btn-small btn-square">
        <Icon name="dots" />
      </button>
    </div>
    <div className="flex items-end justify-between">
      <div className="space-y-1">
        <p className="text-sm font-bold">Prediction File 4582</p>
        <p className="text-xs">#2145008352</p>
      </div>
      <p className="text-[#5F646D] dark:text-white text-xs">05/07/23</p>
    </div>
  </div>
);
