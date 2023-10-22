import Layout from "@/components/Layout";
import FinancialOverview from "./FinancialOverview";
import SalesOverview from "./SalesOverview";


const ECommercePage = () => {
    return (
        <Layout title="Dashboard">
            <div className="flex -mx-2.5 mb-5 lg:block lg:mx-0">
                <div className="w-[calc(66.666%-1.25rem)] mx-2.5 lg:w-full lg:mx-0 lg:mb-5">
                    <SalesOverview />
                </div>
                <div className="w-[calc(33.333%-1.25rem)] mx-2.5 lg:w-full lg:mx-0">
                    <FinancialOverview />
                </div>
            </div>
            <div className="hidden mb-3.5 text-h6 lg:block">Latest Sales</div>
            {/* <Products items={products} /> */}
        </Layout>
    );
};

export default ECommercePage;
