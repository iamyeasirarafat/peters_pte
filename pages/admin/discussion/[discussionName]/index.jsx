import Checkbox from "@/components/Checkbox";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import Sorting from "@/components/Sorting";
import { useHydrated } from "@/hooks/useHydrated";
import axios from "axios";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const discussionTab = [
  { id: 1, name: "discuss", count: 12 },
  { id: 2, name: "new_question", count: 52 },
  { id: 3, name: "new_error", count: 25 },
];
function DiscussionList() {
  const router = useRouter();
  const [data, setData] = useState([])
  console.log(data)
  const { discussionName } = router?.query;
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios(`/${discussionName}/questions`)
      setData(data)
    }
    router.isReady && fetch()
  }, [router.isReady])
  return (
    <Layout title={discussionName?.replace(/_/g, " ")} back>
      {/* Tab */}
      <DiscussionTab data={discussionTab} />
      {mounted && isTablet ? <DiscussionTableMobile /> : <DiscussionTable list={data} />}
    </Layout>
  );
}

export default DiscussionList;

const DiscussionTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState("discuss");
  return (
    <div className="flex items-center gap-x-1.5">
      {data?.map((tab, i) => (
        <button
          onClick={() => setActiveTab(tab?.name)}
          key={tab.id}
          className="flex items-center rounded-sm overflow-hidden"
        >
          <p
            className={`py-2 px-8  text-xs font-bold capitalize hover:bg-black hover:text-white duration-200 ${tab?.name === activeTab
              ? "bg-black text-white"
              : "bg-white text-black"
              }`}
          >
            {tab?.name?.replace("_", " ")}
          </p>
          <p className="flex items-center justify-center bg-primary text-xs text-black p-2 font-bold">
            {tab?.count}
          </p>
        </button>
      ))}
      <button className="flex items-center justify-center bg-primary text-xs text-black p-2 font-bold">
        Mark All As Read
      </button>
    </div>
  );
};

const DiscussionTable = ({ list }) => {
  const [value, setValue] = useState(false);
  return (
    <div className="mt-4">
      <table className="bg-white dark:bg-black w-full">
        <thead>
          <tr>
            <th className="th-custom flex items-center gap-x-4">
              <Checkbox value={value} onChange={() => setValue(!value)} />
              <Sorting title="Question Name" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="Question ID" />
            </th>
            <th className="th-custom text-center">
              <Sorting title="Type" />
            </th>

            <th className="th-custom text-center">
              <Sorting title="Comment" />
            </th>
            <th className="th-custom text-center ">
              <Sorting title="Last Discussed" />
            </th>
          </tr>
        </thead>
        <tbody>
          {
            list?.map(item => <DiscussionRow key={item?.id} data={item} />)
          }
        </tbody>
      </table>
    </div>
  );
};

const DiscussionRow = ({ data }) => {
  const [value, setValue] = useState(false);
  const router = useRouter();
  const { discussionName } = router?.query;
  return (
    <tr>
      <td className="td-custom flex items-center gap-x-4">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <Link href={`${discussionName}/${data?.id}`} className="text-sm hover:text-primary font-bold">{data?.title || "N/A"}</Link>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm">#{data?.id || "N/A"}</p>
      </td>
      <td className="td-custom text-center">
        <p className="text-sm font-bold">Discussion</p>
      </td>

      <td className="td-custom text-center">
        <p className="text-sm">{data?.discussions_count || "0"}</p>
      </td>
      <td className="td-custom flex items-center justify-center gap-x-3">
        <p className="text-sm">{dayjs(data?.last_discussion_date).format("DD/MM/YY")}</p>
        <button className="btn-transparent-dark btn-small btn-square">
          <Icon name="dots" />
        </button>
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
