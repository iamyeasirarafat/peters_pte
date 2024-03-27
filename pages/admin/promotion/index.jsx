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
  const [isOpen, setIsOpen] = useState(null);
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  //fetching Data from api!!
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("/coupon");
      setData(data || []);
    };
    getData();
  }, [status]);
  return (
    <Layout title="Promotion" back>
      {/* Tab */}
      <PromotionTab />
      {mounted && isTablet ? (
        <PromotionTableMobile
          data={data}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setStatus={setStatus}
        />
      ) : (
        <PromotionTable data={data} setStatus={setStatus} />
      )}
    </Layout>
  );
}

export default DiscussionList;

const PromotionTab = ({}) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-x-1.5">
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

const PromotionTable = ({ data, setStatus }) => {
  const [deleteUserList, setDeleteUserList] = useState([]);
  const [openMultiActions, setOpenMultiActions] = useState(false);
  const [isOpen, setIsOpen] = useState(null);
  return (
    <div className="mt-4">
      <table className="bg-white dark:bg-black w-full">
        <thead>
          <tr>
            <th className="th-custom flex items-center gap-x-4">
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
            <th className="th-custom text-right relative">
              {deleteUserList?.length > 0 && (
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
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
            <PromotionRow
              data={item}
              key={item.id}
              deleteUserList={deleteUserList}
              setDeleteUserList={setDeleteUserList}
              setStatus={setStatus}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PromotionRow = ({
  data,
  setDeleteUserList,
  deleteUserList,
  setStatus,
  isOpen,
  setIsOpen,
}) => {
  const [value, setValue] = useState(false);
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

      <td className="td-custom text-right">
        <div className="flex justify-end bg-gray-100">
          <div
            className="relative inline-block text-left"
            onClick={() => setIsOpen(isOpen === data?.id ? null : data?.id)}
          >
            <button
              disabled={deleteUserList?.length > 0}
              className={`btn-transparent-dark btn-small btn-square ${
                deleteUserList?.length > 0 && "cursor-not-allowed opacity-20"
              }`}
            >
              <Icon name="dots" />
            </button>
            {isOpen === data?.id && (
              <MoreButtons data={data} setStatus={setStatus} />
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

const PromotionTableMobile = ({ data, isOpen, setIsOpen, setStatus }) => {
  return (
    <div className="space-y-2">
      {data?.map((item, i) => (
        <div className="bg-white dark:bg-black p-4 mt-4 " key={i}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <p className="text-sm">{item?.title}</p>
              <p className="text-sm font-bold">{item.start_date || "N/A"}</p>
            </div>
            <div
              onClick={() => setIsOpen(isOpen === item?.id ? null : item?.id)}
              className="relative"
            >
              <button className="btn-transparent-dark btn-small btn-square">
                <Icon name="dots" />
              </button>
              {isOpen === item?.id && (
                <MoreButtons data={data} setStatus={setStatus} />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-bold truncate w-[200px]">
                {item.code || "N/A"}
              </p>
              <p className="text-sm">{item.end_date || "N/A"}</p>
            </div>
            <div className="space-y-1 text-end">
              <p className="text-sm">5</p>
              <p className="text-sm">
                {" "}
                {dayjs(item.created_at).format("YYYY-MM-DD") || "N/A"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MoreButtons = ({ data, setStatus }) => {
  const router = useRouter();
  return (
    <div
      className={`absolute top-1/2 right-full bg-secondary dark:bg-black dark:border py-2 px-3 rounded-md`}
    >
      <button
        onClick={() => {
          localStorage.setItem("coupon", JSON.stringify(data));
          router.push("/admin/promotion/update-coupon");
        }}
        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center gap-x-2 whitespace-nowrap"
      >
        <Icon name="settings" /> Edit Coupon
      </button>
      <button
        onClick={async () => {
          await axios.delete("/coupon/" + data.id);
          router.replace("/admin/promotion");
          setStatus((prev) => !prev);
        }}
        className="px-4 py-2 text-sm text-gray-700 hover-bg-gray-100 hover:text-gray-900 flex items-center gap-x-2 whitespace-nowrap"
      >
        <Icon name="remove" /> Remove
      </button>
    </div>
  );
};
