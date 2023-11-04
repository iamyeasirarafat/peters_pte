import Layout from "@/components/Layout";
import TablePagination from "@/components/TablePagination";
import Sorting from "@/components/Sorting";
import Checkbox from "@/components/Checkbox";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import { useMediaQuery } from "react-responsive";
import { useHydrated } from "@/hooks/useHydrated";
import { useState } from "react";

const AdminUser = () => {
  const { mounted } = useHydrated();
  const isTablet = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  return (
    <Layout title="Admin User">
      {mounted && isTablet ? (
        <div className="bg-white dark:bg-black">
          <AdminUserMobile />
        </div>
      ) : (
        <AdminUserList />
      )}

      <TablePagination />
    </Layout>
  );
};

export default AdminUser;

const AdminUserList = () => {
  const [value, setValue] = useState(false);
  return (
    <div className="bg-white dark:bg-black w-full">
      <div className="flex items-center justify-between p-3">
        <div className="w-full flex items-center gap-x-2">
          <Checkbox value={value} onChange={() => setValue(!value)} />
          <Sorting title="User name" />
        </div>
        <div className="w-full flex items-center gap-x-6 justify-between">
          <Sorting title="User Id" />
          <Sorting title="User mail" />
        </div>
      </div>
      <div>
        <AdminUserRow value={value} setValue={setValue} />
      </div>
    </div>
  );
};
const AdminUserRow = () => {
  const [value, setValue] = useState(false);
  return (
    <div className="flex items-center justify-between p-3">
      <div className="w-full flex items-center gap-x-2">
        <Checkbox value={value} onChange={() => setValue(!value)} />
        <Image
          className="w-9 h-9 rounded-full"
          src={"/images/payment/stripe.png"}
          width={50}
          height={50}
          alt=""
        />
        <p className="text-sm font-bold">Tushar Ahmed</p>
      </div>
      <div className="w-full flex items-center gap-x-6 justify-between">
        <p className="text-sm font-bold">tusha789</p>
        <div className="flex items-center gap-x-5">
          <p className="text-sm font-bold">tushar@gmail.com</p>
          <button className="btn-transparent-dark btn-small btn-square">
            <Icon name="dots" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminUserMobile = () => (
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
        <p className="text-sm font-bold">Dhaka PTE</p>
        <p className="text-[#5F646D] dark:text-white text-sm font-medium">
          tusha987
        </p>
      </div>
    </div>
    <div className="text-right space-y-1">
      <button className="btn-transparent-dark btn-small btn-square">
        <Icon name="dots" />
      </button>
      <p className="text-[#5F646D] dark:text-white text-sm font-medium">
        tushar@gmail.com
      </p>
    </div>
  </div>
);
