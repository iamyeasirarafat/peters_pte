import Layout from "@/components/Layout";
// import Image from "next/image";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import { FaUsers } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import { MdAccountBalanceWallet, MdQuiz } from "react-icons/md";
import { BiRightArrowAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const fullMocktest = [
  {
    title: "25x Full Mocktest",
    price: "499",
    thumbnail: "/images/payment/25x.png",
  },
  {
    title: "50x Full Mocktest ",
    price: "799",
    thumbnail: "/images/payment/50x.png",
  },
  {
    title: "100x Full Mocktest ",
    price: "1499",
    thumbnail: "/images/payment/100x.png",
  },
  {
    title: "250x Full Mocktest ",
    price: "3999",
    thumbnail: "/images/payment/250x.png",
  },
];
function BillingPayment() {
  const router = useRouter();
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const getPlans = async () => {
      const res = await axios.get("/plans");
      setPlans(res?.data);
    };
    getPlans();
  }, []);
  console.log("plans", plans);
  const premiumAccounts = [
    {
      name: "Premium 7 Days Account",
      price: "499",
      image: "/images/payment/7days.png",
    },
    {
      name: "Premium 15 Days Account",
      price: "799",
      image: "/images/payment/15days.png",
    },
    {
      name: "Premium 30 Days Account",
      price: "1499",
      image: "/images/payment/30days.png",
    },
    {
      name: "Premium 90 Days Account",
      price: "3999",
      image: "/images/payment/90days.png",
    },
  ];
  return (
    <Layout title="Billing & Payment">
      <div className="grid grid-cols-12 gap-5">
        {/* left side content */}
        <div className="col-span-8 md:col-span-12 p-5 bg-white dark:bg-black">
          <p className="text-lg font-extrabold">Purchase Bluk Account</p>
          <p className="text-xs font-bold my-5">Click to Purchase</p>
          {/* Offer*/}
          <div className="grid grid-cols-2 items-center gap-x-4 gap-y-3">
            <div className="w-full">
              <Pricing data={plans} />
            </div>
          </div>
          {/* payment method */}
          <div className="mt-30 space-y-5">
            <p className="text-lg font-extrabold">Payment Method</p>
            {/* method */}
            <PaymentMethod />
            <PaymentMethod />
          </div>
        </div>
        {/* right side content */}
        <div className="col-span-4 md:col-span-12 flex flex-col gap-y-3">
          <CountCart />
          <div className="w-full h-full bg-[url('/images/payment/th-bg.png')] bg-no-repeat bg-cover bg-center p-5 space-y-2">
            <p className="text-lg font-extrabold text-white">
              Transaction History
            </p>
            <button
              onClick={() =>
                router.push(
                  "/organization/billing-payment/transactions-history"
                )
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
  const router = useRouter();
  return (
    <div className="space-y-3">
      {data?.map((item, i) => {
        return (
          <div
            key={item?.id || i}
            onClick={() =>
              router.push(
                `/organization/billing-payment/checkout?id=${item?.id}`
              )
            }
            className="flex items-center bg-secondary dark:bg-[#161616] p-3 gap-x-3 cursor-pointer"
          >
            {/* image */}
            <Image
              className="w-13 h-13 rounded-sm"
              src={item?.thumbnail}
              width={100}
              height={100}
              alt=""
            />
            {/* name & price */}
            <div>
              <p className="text-sm font-bold">{item?.title}</p>
              <p className="text-sm font-bold">{item?.price} BDT</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const PaymentMethod = () => {
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
              <p className="text-sm font-bold">Used 5 Times</p>
              <p className="text-xs font-medium">Activated</p>
            </div>
            <button className="btn-transparent-dark btn-small btn-square md:hidden">
              <Icon name="dots" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CountCart = () => {
  const data = [
    { name: "Remaining Account", count: "45", icon: <FaUsers /> },
    { name: "Currently Used Account", count: "565", icon: <IoDiamondSharp /> },
    {
      name: "Remaining Mocktest",
      count: "38",
      icon: <MdQuiz />,
    },
    {
      name: "Currently Used Mocktest",
      count: "38",
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
