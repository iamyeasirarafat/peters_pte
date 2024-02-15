import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Layout from "@/components/Layout";
import Sorting from "@/components/Sorting";
import { useHydrated } from "@/hooks/useHydrated";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
const Index = () => {
  const router = useRouter();
  const { ListName } = router.query || {};
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios(
        `/packages/${
          ListName === "students_package" ? "student" : "organization"
        }`
      );
      setData(res?.data);
    };
    fetchData();
  }, [ListName]);
  return (
    <Layout title={ListName?.replace("_", " ")} back>
      <div>
        <button
          onClick={() => {
            router.push(
              `/admin/billing-plan/${
                ListName === "students_package"
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
          {data ? (
            <ListTable data={data} />
          ) : (
            <p>{ListName?.replace("_", " ")} Package not available</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;

const ListTable = ({ data }) => {
  const [moreShow, setMoreShow] = useState(null);
  const router = useRouter();
  const { ListName } = router.query || {};
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  return mounted && isTablet ? (
    <div className="bg-white dark:bg-black">
      {data?.map((item, index) => (
        <MobileTRTable key={index} data={item} ListName={ListName} />
      ))}
    </div>
  ) : (
    <table className="bg-white dark:bg-black w-full">
      <thead>
        <tr>
          <th className="th-custom">
            <Sorting title="Package Details" />
          </th>

          <th className="th-custom text-center">
            <Sorting title="SKU" />
          </th>
          <th className="th-custom text-center">
            <Sorting
              title={ListName === "students_package" ? "Validity" : "Variation"}
            />
          </th>
          <th className="th-custom text-right">
            <Sorting title="Price" />
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <TransactionsRow
            data={item}
            listName={ListName}
            key={item.id}
            moreShow={moreShow}
            setMoreShow={setMoreShow}
          />
        ))}
      </tbody>
    </table>
  );
};

const TransactionsRow = ({ data, listName, moreShow, setMoreShow }) => {
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
      <td className="td-custom text-sm font-bold text-center">
        {data?.sku || "N/a"}
      </td>
      <td className="td-custom text-center">
        {listName === "students_package"
          ? `${data?.validity} Days`
          : data?.validation?.length}
      </td>

      <td className="td-custom flex items-center justify-end gap-x-3">
        {listName === "students_package" ? (
          `${data?.cost} BDT`
        ) : (
          <p className="text-sm font-bold">
            {data?.validation?.[0]?.cost} -{" "}
            {data?.validation?.[data?.validation.length - 1]?.cost} BDT
          </p>
        )}
        <button
          onClick={() => setMoreShow(data?.id === moreShow ? null : data?.id)}
          className="btn-transparent-dark btn-small btn-square relative"
        >
          <Icon name="dots" />
          {moreShow === data?.id && <PackMore id={data?.id} />}
        </button>
      </td>
    </tr>
  );
};

const MobileTRTable = ({ data, ListName }) => (
  <div className="flex items-center justify-between p-4">
    <div className="flex items-center gap-x-3 ">
      <Image
        className="w-9 h-9 rounded-full"
        src={data.thumbnail}
        width={50}
        height={50}
        alt=""
      />
      <div className="space-y-1">
        <p className="text-sm font-bold">{data?.title || "N/A"}</p>
        <div>
          {ListName === "students_package" ? (
            `${data?.cost} BDT`
          ) : (
            <p className="text-sm font-bold">
              {data?.validation?.[0]?.cost} -{" "}
              {data?.validation?.[data?.validation.length - 1]?.cost} BDT
            </p>
          )}
        </div>
      </div>
    </div>
    <div className="text-right space-y-1">
      <p>
        {ListName === "students_package"
          ? `Validity ${data?.validity} Days`
          : `Variation ${data?.validation?.length}`}
      </p>
      <td className="td-custom text-sm font-bold text-center">N/a</td>
    </div>
  </div>
);

const PackMore = ({ id }) => {
  const router = useRouter();
  const { ListName } = router.query || {};
  return (
    <div className="bg-secondary dark:bg-black p-1 rounded-md absolute top-0 right-full">
      <button
        onClick={() =>
          router.push({
            pathname: `/admin/billing-plan/${
              ListName === "students_package"
                ? "add-student-package"
                : "add-org-package"
            }`,
            query: `id=${id}`,
          })
        }
        className="py-2 px-3 rounded-md text-base hover:text-purple-1 text-black"
      >
        Edit
      </button>
    </div>
  );
};
