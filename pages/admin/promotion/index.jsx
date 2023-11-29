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


function DiscussionList() {
    const [data, setData] = useState([])
    const { mounted } = useHydrated();
    const isTablet = useMediaQuery({
        query: "(max-width: 1023px)",
    });

    //fetching Data from api!!
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios("/coupon")
            console.log(data)
            setData(data || [])
        }
        getData()
    }, [])
    return (
        <Layout title="Promotion" back>
            {/* Tab */}
            <DiscussionTab />
            {mounted && isTablet ? <DiscussionTableMobile data={data} /> : <DiscussionTable data={data} />}
        </Layout>
    );
}

export default DiscussionList;

const DiscussionTab = ({ }) => {
    const router = useRouter()

    return (
        <div className="flex items-center gap-x-1.5">
            <button className="bg-white font-bold btn-small">
                <Icon name="filters" />
                <span>Apply Filters</span>
            </button>
            <button className="btn-purple font-bold btn-small">
                <Icon name="edit" />
                <span>Create new coupon</span>
            </button>
            <button className="btn-purple font-bold btn-small">
                <Icon name="edit" />
                <span>Promo Banner</span>
            </button>

        </div>
    );
};

const DiscussionTable = ({ data }) => {
    const [value, setValue] = useState(false);
    return (
        <div className="mt-4">
            <table className="bg-white dark:bg-black w-full">
                <thead>
                    <tr>
                        <th className="th-custom flex items-center gap-x-4">
                            <Checkbox value={value} onChange={() => setValue(!value)} />
                            <Sorting title="Coupon Name" />
                        </th>
                        <th className="th-custom text-right">
                            <Sorting title="Starting Date" />
                        </th>
                        <th className="th-custom text-right">
                            <Sorting title="Ending Date" />
                        </th>
                        <th className="th-custom text-right">
                            <Sorting title="Coupon Code" />
                        </th>
                        <th className="th-custom text-right ">
                            <Sorting title="Created In" />
                        </th>
                        <th className="th-custom text-right ">
                            <button className="btn-transparent-dark btn-small btn-square">
                                <Icon name="dots" />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(item => <DiscussionRow data={item} key={item.id} />)
                    }
                </tbody>
            </table>
        </div>
    );
};

const DiscussionRow = ({ data }) => {
    const [value, setValue] = useState(false);

    return (
        <tr>
            <td className="td-custom flex items-center gap-x-4">
                <Checkbox value={value} onChange={() => setValue(!value)} />
                <p className="text-sm font-bold">{data.title || "N/A"}</p>
            </td>
            <td className="td-custom text-right">
                <p className="text-sm">{data.start_date || "N/A"}</p>
            </td>
            <td className="td-custom text-right">
                <p className="text-sm">{data.end_date || "N/A"}</p>
            </td>
            <td className="td-custom text-right">
                <p className="text-sm">{data.code || "N/A"}</p>
            </td>
            <td className="td-custom text-right">
                <p className="text-sm">{dayjs(data.created_at).format("YYYY-MM-DD") || "N/A"}</p>
            </td>

            <td className="td-custom  text-right ">
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
