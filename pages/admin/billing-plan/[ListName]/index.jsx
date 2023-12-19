import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Layout from "@/components/Layout";
import Sorting from "@/components/Sorting";
import TablePagination from "@/components/TablePagination";
import { useHydrated } from "@/hooks/useHydrated";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
const Index = () => {
  const router = useRouter();
  const { ListName } = router.query || {};
  const [data, setData] = useState()
  console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(
        `/packages/${ListName === "students_package" ? "student" : "organization"}`
      );
      setData(res.data)
    }
    fetchData()
  }, [ListName])
  return (
    <Layout title={ListName?.replace("_", " ")} back>
      <div>
        <button
          onClick={() => {
            router.push(
              `/admin/billing-plan/${ListName === "students_package"
                ? "add-student-package"
                : "add-org-package"
              }`
            );
          }}
          className="flex items-center gap-x-2 text-sm font-bold py-2 px-3 bg-primary"
        >
          <MdModeEdit /> Create new Package
        </button>
        {/* Package list */}
        <div className="mt-4">
          <ListTable data={data} />
          <TablePagination />
        </div>
      </div>
    </Layout>
  );
};

export default Index;

const ListTable = ({ data }) => {
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
            <Sorting title="Package Details" />
          </th>

          <th className="th-custom text-right">
            <Sorting title="SKU" />
          </th>
          <th className="th-custom text-right">
            <Sorting title="Variation" />
          </th>
          <th className="th-custom text-right">
            <Sorting title="Price" />
          </th>
          <th className="th-custom text-right">
          </th>
        </tr>
      </thead>
      <tbody>
        {
          data?.map(item => <TransactionsHistoryRow data={item} key={item.id} />)
        }
      </tbody>
    </table>
  );
};

const TransactionsHistoryRow = ({ data }) => {
  return (
    <tr>
      <td className="td-custom">
        <div className="flex items-center gap-x-3">
          <Image
            className="w-9 h-9 rounded-full"
            src={data.thumbnail}
            width={50}
            height={50}
            alt=""
          />
          <p className="text-sm font-bold dark:text-white">
            {data?.title || "N/A"}
          </p>
        </div>
      </td>
      <td className="td-custom text-sm font-bold text-right">
        N/a
      </td>
      <td className="td-custom text-right">
        {data?.validation?.length} Variation
      </td>

      <td className="td-custom text-right">
        <p className="text-sm font-bold">{
          data?.validation[0]?.cost

        } - {data?.validation[data?.validation.length - 1]?.cost} BDT</p>

      </td>
      <td className="td-custom flex justify-end">
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
