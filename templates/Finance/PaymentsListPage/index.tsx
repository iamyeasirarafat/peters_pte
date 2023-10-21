import { useState } from "react";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Icon from "@/components/Icon";
import LatestTransfers from "./LatestTransfers";
import RecentTransfers from "./RecentTransfers";

import {
    paymentVariants,
    transactions2,
    recentTransfers,
} from "@/mocks/finance";

const PaymentsListPage = () => {
    const [search, setSearch] = useState<string>("");

    return (
        <Layout title="Payments">
            <div className="flex items-start lg:block">
                <div className="grow card pt-4 px-5 pb-6 lg:mb-6 md:pt-5">
                    <div className="flex justify-between items-center mb-4 md:block">
                        <div className="text-h6 md:mb-3">Make a payment</div>
                        <Search
                            className="ml-auto md:w-full"
                            placeholder="Search"
                            value={search}
                            onChange={(e: any) => setSearch(e.target.value)}
                            onSubmit={() => console.log("Submit")}
                        />
                    </div>
                    <div className="mb-6">
                        {paymentVariants.map((group, index) => (
                            <div className="mb-5 last:mb-0" key={index}>
                                <div className="mb-5 text-xs font-bold">
                                    {group.title}
                                </div>
                                <div className="flex flex-wrap -mt-5 -mx-2 md:block md:-mt-2.5 md:mx-0">
                                    {group.items.map((item, index) => (
                                        <div
                                            className="flex items-center w-[calc(50%-1.25rem)] mt-5 mx-2.5 p-3 border border-dashed border-n-1 md:w-full md:mx-0 md:mt-2.5 dark:border-white"
                                            key={index}
                                        >
                                            <div className="flex items-center justify-center w-13 h-13 border border-n-1 bg-purple-1">
                                                <Icon
                                                    className="icon-18"
                                                    name={item.icon}
                                                />
                                            </div>
                                            <div className="grow pl-3.5">
                                                <div className="mb-0.5 text-sm font-bold">
                                                    {item.title}
                                                </div>
                                                <div className="text-xs font-medium">
                                                    {item.details}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <LatestTransfers items={transactions2} />
                </div>
                <div className="shrink-0 w-96 ml-5 4xl:w-80 2xl:w-72 lg:w-full lg:ml-0">
                    <RecentTransfers items={recentTransfers} />
                </div>
            </div>
        </Layout>
    );
};

export default PaymentsListPage;
