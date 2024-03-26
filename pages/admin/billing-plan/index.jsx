import Layout from "@/components/Layout";
// import Image from "next/image";
import Image from "@/components/Image";
import { Switch as SwitchReact } from "@headlessui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import { MdAccountBalanceWallet, MdQuiz } from "react-icons/md";
import { twMerge } from "tailwind-merge";

function BillingPayment() {
  const router = useRouter();
  const [packCount, setPackCount] = useState({});
  useEffect(() => {
    const getCount = async () => {
      const res = await axios.get("/package/count");
      setPackCount(res.data);
    };
    getCount();
  }, []);
  const premiumAccounts = [
    {
      name: "Student Package",
      count: packCount?.student_package || 0,
      image: "/std_pkg.png",
      link: "/admin/billing-plan/students_package",
    },
    {
      name: "Organization Package",
      count: packCount?.organization_package || 0,
      image: "/org_pkg.png",
      link: "/admin/billing-plan/organization_package",
    },
  ];
  return (
    <Layout title="Billing & Payment">
      <div className="grid grid-cols-12 gap-5 h-full">
        {/* left side content */}
        <div className="md:col-span-8 flex flex-col justify-between col-span-12 p-5 bg-white dark:bg-black">
          <div>
            <p className="text-lg font-extrabold">Plan & Package Creator</p>
            <p className="text-xs font-bold my-5">Click to Go</p>
            {/* Offer*/}
            <div className="w-full">
              <Pricing data={premiumAccounts} />
            </div>
          </div>

          {/* payment method */}
          <div className="space-y-5 mt-3">
            <p className="text-lg font-extrabold">Payment Method</p>
            {/* method */}
            <PaymentMethod />
          </div>
        </div>
        {/* right side content */}
        <div className="md:col-span-4 col-span-12 flex flex-col gap-y-3">
          <CountCart />
          <div className="w-full h-full bg-[url('/images/payment/th-bg.png')] bg-no-repeat bg-cover bg-center p-5 space-y-2">
            <p className="text-lg font-extrabold text-white">
              Transaction History
            </p>
            <button
              onClick={() =>
                router.push("/admin/billing-plan/transactions-history")
              }
              className="flex items-center gap-x-2 bg-white text-black text-lg font-extrabold py-2 px-4 rounded-sm"
            >
              See All Your Transaction <BiRightArrowAlt />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BillingPayment;

const Pricing = ({ data }) => {
  return (
    <div className="flex md:flex-row flex-col gap-3 w-full">
      {data?.map((item, i) => {
        return (
          <Link key={item?.id || i} href={item.link} className="w-full">
            <div className="flex w-full items-center bg-secondary dark:bg-[#161616] p-3 gap-x-3 cursor-pointer">
              {/* image */}
              <Image
                className="w-13 h-13 rounded-sm"
                src={item?.image}
                width={100}
                height={100}
                alt=""
              />
              {/* name & price */}
              <div>
                <p className="text-sm font-bold">{item?.name}</p>
                <p className="text-sm font-bold">{item?.count} Packages</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const PaymentMethod = () => {
  const [payment, setPayment] = useState(true);
  return (
    <div>
      <div className="flex items-center gap-x-3">
        <Image
          className="w-9 h-9 rounded-full"
          src={"/images/payment/stripe.png"}
          width={36}
          height={36}
          alt=""
        />
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-sm font-bold">SSL Commerce</p>
            <p className="text-xs font-medium">
              Supports Mobile Banking, Card, Bank Transfer
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <div className="text-right">
              <Switch value={payment} setValue={setPayment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CountCart = () => {
  const data = [
    { name: "Remaining Account", count: "0", icon: <FaUsers /> },
    { name: "Currently Used Account", count: "0", icon: <IoDiamondSharp /> },
    {
      name: "Remaining Mocktest",
      count: "0",
      icon: <MdQuiz />,
    },
    {
      name: "Currently Used Mocktest",
      count: "0",
      icon: <MdAccountBalanceWallet />,
    },
  ];
  return (
    <div className="space-y-2.5">
      {data?.map((item, i) => (
        <div
          key={i}
          className="py-6 px-5 bg-white dark:bg-black flex items-center gap-x-5"
        >
          <p className="p-3.5 border border-black dark:border-white rounded-sm">
            {item?.icon}
          </p>
          <div>
            <p className="text-xl font-semibold">{item?.count}</p>
            <p className="text-sm">{item?.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Switch = ({ className, value, setValue }) => (
  <div className={`inline-flex bg-secondary shrink-0 ${className}`}>
    <SwitchReact
      checked={value}
      // onChange={setValue}
      className={`relative inline-flex items-center w-10 h-6 pl-0.75 cursor-pointer rounded-sm transition-colors outline-none bg-secondary`}
    >
      <span
        aria-hidden="true"
        className={twMerge(
          `pointer-events-none inline-block w-4 h-4 transition-all ${
            value ? "translate-x-4 bg-primary" : "translate-x-0 bg-n-1"
          }`
        )}
      />
    </SwitchReact>
  </div>
);
