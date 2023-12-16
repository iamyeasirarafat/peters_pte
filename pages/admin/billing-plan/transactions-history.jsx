import Layout from "@/components/Layout";
import Sorting from "@/components/Sorting";
import TablePagination from "@/components/TablePagination";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import { useMediaQuery } from "react-responsive";
import { useHydrated } from "@/hooks/useHydrated";
function TransactionsHistory() {
  return (
    <Layout title="Transactions History" back>
      <TransactionsHistoryTable />
      <TablePagination />
    </Layout>
  );
}

export default TransactionsHistory;

const TransactionsHistoryTable = () => {
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  return mounted && isTablet ? (
    <div className="bg-white dark:bg-black">
      <MobileTRTable />
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
        <TransactionsHistoryRow />
      </tbody>
    </table>
  );
};

const TransactionsHistoryRow = () => {
  return (
    <tr>
      <td className="td-custom">
        <p className="text-[#5F646D] dark:text-white text-sm font-medium">
          4 Aug 1:00 PM
        </p>
      </td>
      <td className="td-custom text-sm font-bold">
        Premium 30 Days Account - 7 Bluk Account
      </td>
      <td className="td-custom">
        <div className="flex items-center gap-x-3">
          <Image
            className="w-9 h-9 rounded-full"
            src={"/images/payment/stripe.png"}
            width={50}
            height={50}
            alt=""
          />
          <p className="text-[#5F646D] dark:text-white text-sm font-medium">
            Stripe
          </p>
        </div>
      </td>
      <td className="td-custom text-[#5F646D] dark:text-white text-sm font-medium">
        #PPTE - 548602
      </td>
      <td className="td-custom flex items-center justify-between">
        <p className="text-sm font-bold">5940 BDT</p>
        <button className="btn-transparent-dark btn-small btn-square">
          <Icon name="dots" />
        </button>
      </td>
    </tr>
  );
};

const MobileTRTable = () => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center gap-x-3 ">
      <Image
        className="w-10 h-10 rounded-full"
        src={"/images/payment/stripe.png"}
        width={50}
        height={50}
        alt=""
      />
      <div className="space-y-1">
        <p className="text-sm font-bold">Premium 30 Days</p>
        <p className="text-[#5F646D] dark:text-white text-sm font-medium">
          Stripe
        </p>
      </div>
    </div>
    <div className="text-right space-y-1">
      <p className="text-sm font-bold">5940 BDT</p>
      <p className="text-[#5F646D] dark:text-white text-sm font-medium">
        #PPTE - 548602
      </p>
    </div>
  </div>
);
