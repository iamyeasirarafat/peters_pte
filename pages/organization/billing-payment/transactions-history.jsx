import Layout from "@/components/Layout";
import Sorting from "@/components/Sorting";
import TablePagination from "@/components/TablePagination";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import { useMediaQuery } from "react-responsive";
import { useHydrated } from "@/hooks/useHydrated";
import { useEffect, useState } from "react";
import { formatDateWithName } from "@/utils/formatDateWithName";
import axios from "axios";
function TransactionsHistory() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/payment/history");
      setTransactions(res.data);
    };
    getData();
  }, []);
  return (
    <Layout title="Transactions History" back>
      <TransactionsHistoryTable data={transactions} />
      <TablePagination />
    </Layout>
  );
}

export default TransactionsHistory;

const TransactionsHistoryTable = ({ data }) => {
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  return mounted && isTablet ? (
    <div className="bg-white dark:bg-black">
      {data?.map((item, index) => (
        <MobileTRTable key={index} data={item} />
      ))}
    </div>
  ) : (
    <table className="bg-white dark:bg-black w-full">
      <thead>
        <tr>
          <th className="th-custom">
            <Sorting title="Date & Time" />
          </th>
          <th className="th-custom">
            <Sorting title="Order Details" />
          </th>
          <th className="th-custom">
            <Sorting title="Payment Method" />
          </th>
          <th className="th-custom">
            <Sorting title="Order Id" />
          </th>
          <th className="th-custom">
            <Sorting title="Price" />
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <TransactionsHistoryRow key={index} data={item} />
        ))}
      </tbody>
    </table>
  );
};

const TransactionsHistoryRow = ({ data }) => {
  return (
    <tr>
      <td className="td-custom">
        <p className="text-[#5F646D] dark:text-white text-sm font-medium">
          {formatDateWithName(data?.tran_date)}
        </p>
      </td>
      <td className="td-custom text-sm font-bold">
        {data?.purchase?.title} - {data?.purchase?.validate_title} Bluk Account
      </td>
      <td className="td-custom">{data?.card_type}</td>
      <td className="td-custom text-[#5F646D] dark:text-white text-sm font-medium">
        #{data?.tran_id}
      </td>
      <td className="td-custom flex items-center justify-between">
        <p className="text-sm font-bold">{data?.amount} BDT</p>
        <button className="btn-transparent-dark btn-small btn-square">
          <Icon name="dots" />
        </button>
      </td>
    </tr>
  );
};

const MobileTRTable = ({ data }) => (
  <div className="flex items-center justify-between p-4">
    <div className="space-y-1">
      <p className="text-sm font-bold">{data?.purchase?.title}</p>
      <p className="text-[#5F646D] dark:text-white text-sm font-medium">
        {data?.purchase?.validate_title} Bluk Account
      </p>
    </div>
    <div className="text-right space-y-1">
      <p className="text-sm font-bold">{data?.amount} BDT</p>
      <p className="text-[#5F646D] dark:text-white text-sm font-medium">
        #{data?.tran_id}
      </p>
    </div>
  </div>
);
