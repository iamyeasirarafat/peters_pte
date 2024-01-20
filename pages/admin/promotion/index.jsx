import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import Sorting from "@/components/Sorting";
import { useHydrated } from "@/hooks/useHydrated";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { MultiActions } from "@/components/Students_list";

function DiscussionList() {
  const [status, setStatus] = useState(false);
  const [data, setData] = useState([]);
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  //fetching Data from api!!
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/coupon");
      console.log(data);
      setData(data || []);
    };
    getData();
  }, [status]);
  return (
    <Layout title="Promotion" back>
      {/* Tab */}
      <DiscussionTab />
      {mounted && isTablet ? (
        <DiscussionTableMobile data={data} />
      ) : (
        <DiscussionTable data={data} setStatus={setStatus} />
      )}
    </Layout>
  );
}

export default DiscussionList;

const DiscussionTab = ({}) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-x-1.5">
      <button className="bg-white font-bold btn-small">
        <Icon name="filters" />
        <span>Apply Filters</span>
      </button>
      <button
        onClick={() => {
          router.push("/admin/promotion/create-coupon");
        }}
        className="btn-purple font-bold btn-small"
      >
        <Icon name="edit" />
        <span>Create new coupon</span>
      </button>
      <button
        onClick={() => router.push("/admin/promotion/promo-banner")}
        className="btn-purple font-bold btn-small"
      >
        <Icon name="edit" />
        <span>Promo Banner</span>
      </button>
    </div>
  );
};

const DiscussionTable = ({ data, setStatus }) => {
  const [value, setValue] = useState(false);
  const [deleteUserList, setDeleteUserList] = useState([]);
  const [openMultiActions, setOpenMultiActions] = useState(false);
  return (
    <div className="mt-4">
      <table className="bg-white dark:bg-black w-full">
        <thead>
          <tr>
            <th className="th-custom flex items-center gap-x-4">
              <Checkbox value={value} onChange={() => setValue(!value)} />
              <Sorting title="Coupon Name" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="Starting Date" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="Ending Date" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="Coupon Code" />
            </th>
            <th className="th-custom text-center ">
              <Sorting title="Created In" />
            </th>
            <th className="th-custom text-center">
              {deleteUserList?.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setOpenMultiActions(!openMultiActions)}
                    className="btn-transparent-dark btn-small btn-square"
                  >
                    <Icon name="dots" />
                  </button>
                  {openMultiActions && (
                    <MultiActions
                      type="Coupon"
                      deleteUserList={deleteUserList}
                      setDeleteUserList={setDeleteUserList}
                      setOpenMultiActions={setOpenMultiActions}
                      setStatus={setStatus}
                    />
                  )}
                </div>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <DiscussionRow
              data={item}
              key={item.id}
              deleteUserList={deleteUserList}
              setDeleteUserList={setDeleteUserList}
              setStatus={setStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const DiscussionRow = ({
  data,
  setDeleteUserList,
  deleteUserList,
  setStatus,
}) => {
  const [value, setValue] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (deleteUserList && deleteUserList.includes(data.id)) {
      setValue(true);
    } else {
      setValue(false);
    }
  }, [data, deleteUserList]);

  return (
    <tr>
      <td className="td-custom flex items-center gap-x-4">
        <Checkbox
          value={value}
          onChange={() => {
            setValue(!value);
            if (!value) {
              setDeleteUserList((prev) => [...prev, data.id]);
            } else {
              setDeleteUserList((prev) => prev.filter((i) => i !== data.id));
            }
          }}
        />
        <p className="text-sm font-bold">{data.title || "N/A"}</p>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm">{data.start_date || "N/A"}</p>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm">{data.end_date || "N/A"}</p>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm">{data.code || "N/A"}</p>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm">
          {dayjs(data.created_at).format("YYYY-MM-DD") || "N/A"}
        </p>
      </td>

      <td className="td-custom  text-center ">
        <div className="flex justify-center bg-gray-100 ">
          <div
            className="relative inline-block text-left"
            onClick={toggleDropdown}
          >
            <button className="btn-transparent-dark btn-small btn-square">
              <Icon name="dots" />
            </button>
            <div
              style={{ backgroundColor: "#FAF4F0" }}
              className={`${
                isOpen ? "block" : "hidden"
              } origin-top-right font-semibold absolute right-full top-0 z-3 mt-1 w-52 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              <div role="none">
                <button
                  onClick={() => {
                    localStorage.setItem("coupon", JSON.stringify(data));
                    router.push("/admin/promotion/update-coupon");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="settings" /> Edit Coupon
                </button>
                <button
                  onClick={async () => {
                    await axios.delete("/coupon/" + data.id);
                    router.replace("/admin/promotion");
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900"
                >
                  <Icon name="cross" /> Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

const DiscussionTableMobile = () => {
  return (
    <div className="bg-white dark:bg-black p-4 mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <p className="text-sm">Eshak khan</p>
          <p className="text-sm font-bold">Discussion</p>
        </div>
        <button className="btn-transparent-dark btn-small btn-square">
          <Icon name="dots" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-bold truncate w-[200px]">
            I am in day 2 of doing Shadowing 2 of doing Shadowing
          </p>
          <p className="text-sm">#c782200004582</p>
        </div>
        <div className="space-y-1 text-end">
          <p className="text-sm">5</p>
          <p className="text-sm">05/10/23</p>
        </div>
      </div>
    </div>
  );
};
