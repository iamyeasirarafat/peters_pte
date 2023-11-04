import Layout from "@/components/Layout";
import TablePagination from "@/components/TablePagination";
import Sorting from "@/components/Sorting";
import Checkbox from "@/components/Checkbox";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import { useState } from "react";

const AdminUser = () => {
  return (
    <Layout title="Admin User">
      <AdminUserList />
      <TablePagination />
    </Layout>
  );
};

export default AdminUser;

const AdminUserList = () => {
  const [value, setValue] = useState(false);
  return (
    <div className="bg-white dark:bg-black w-full">
      <div className="flex items-center justify-between p-3">
        <div className="w-full flex items-center gap-x-2">
          <Checkbox value={value} onChange={() => setValue(!value)} />
          <Sorting title="User name" />
        </div>
        <div className="w-full flex items-center gap-x-6 justify-between">
          <div className="">
            <Sorting title="User Id" />
          </div>
          <div className="">
            <Sorting title="User mail" />
          </div>
        </div>
      </div>
      <div>
        <TransactionsHistoryRow value={value} setValue={setValue} />
      </div>
    </div>
  );
};
const TransactionsHistoryRow = () => {
  const [value, setValue] = useState(false);
  return (
    <div className="flex items-center justify-between p-3">
      <div className="w-full flex items-center gap-x-2">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <Image
          className="w-9 h-9 rounded-full"
          src={"/images/payment/stripe.png"}
          width={50}
          height={50}
          alt=""
        />
        <p className="text-sm font-bold">Tushar Ahmed</p>
      </div>
      <div className="w-full flex items-center gap-x-6 justify-between">
        <p className="text-sm font-bold">tusha789</p>
        <div className="flex items-center gap-x-5">
          <p className="text-sm font-bold">tushar@gmail.com</p>
          <button className="btn-transparent-dark btn-small btn-square">
            <Icon name="dots" />
          </button>
        </div>
      </div>
    </div>
  );
};
