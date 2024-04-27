import CustomModal from "@/components/CustomModal";
import Field from "@/components/Field";
import Image from "@/components/Image";
import Layout from "@/components/Layout";
import Select from "@/components/Select";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillPrinter } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const paymentMethods = [{ id: 1, title: "SSL Commerce" }];
function Checkout() {
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id, status, pid } = router.query;
  const [open, setOpen] = useState({ state: false, pid: null, status: null });
  const [accountsType, setAccountsType] = useState([]);
  const [accountType, setAccountType] = useState({});
  const [accountsCount, setAccountsCount] = useState([]);
  const [accountCount, setAccountCount] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  useEffect(() => {
    const getPackage = async () => {
      try {
        const res = await axios.get(`/packages/organization`);
        setAccountsType(res?.data);
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };
    router.isReady && getPackage();
  }, [id, router.isReady]);
  useEffect(() => {
    if (Array.isArray(accountsType) && accountsType.length > 0 && id) {
      const selectedAccountType = accountsType.find(
        (item) => item.id === parseInt(id)
      );
      setAccountType(selectedAccountType || {});
    }
  }, [accountsType, id]);
  useEffect(() => {
    if (!accountType) return;
    setAccountsCount(accountType?.validation || []);
  }, [accountType]);
  useEffect(() => {
    if (!accountsCount || accountsCount.length === 0) return;
    setAccountCount(accountsCount[0]);
  }, [accountsCount]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async () => {
    setIsLoading(true);
    const formData = {
      package: accountType?.id,
      validation: accountCount?.id,
    };
    try {
      const res = await axios.post("/payment/organization", formData);
      setIsLoading(false);
      router.push(res?.data?.redirect_url);
      window.open(res?.data?.redirect_url, "_blank", "noopener,noreferrer");
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (router.isReady && pid && status) {
      setOpen({ state: true, pid: pid, status: status });
    }
  }, [router.isReady, status, pid]);

  return (
    <Layout title="Checkout" back>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:w-full xl:w-2/3 w-1/2 mx-auto flex flex-col gap-3"
      >
        <Select
          label="Bulk Account Type"
          items={accountsType}
          value={accountType}
          onChange={setAccountType}
        />
        <Select
          label="Quantity"
          items={accountsCount}
          value={accountCount}
          onChange={setAccountCount}
        />
        <Field
          errors={errors}
          label="Total Cost"
          placeholder={`${accountCount?.cost} BDT`}
          currency={`You Saved ${accountCount?.saving} BDT`}
          register={register}
          name="total_cost"
          isReadOnly
        />
        <Select
          label="Select Payment Method"
          items={paymentMethods}
          value={paymentMethod}
          onChange={setPaymentMethod}
        />
        <div className="pt-5 flex lg:flex-col flex-row items-center justify-between gap-2.5">
          <Image
            className="w-full h-[50px] rounded-sm"
            src={"/images/payment/GUARANTEED.svg"}
            width={100}
            height={100}
            alt=""
          />
          <Image
            className="w-full h-[50px] rounded-sm"
            src={"/images/payment/safe.svg"}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="pt-2 flex items-center gap-x-2">
          <input
            onChange={() => setAcceptPolicy(!acceptPolicy)}
            className="text-primary border-2 w-4 h-4 bg-transparent outline-none ring-transparent border-primary focus:ring-transparent cursor-pointer"
            type="checkbox"
            id="policy"
          />
          <label className="text-[#949494]" htmlFor="policy">
            By making payment you are agreed to our{" "}
            <Link
              target="_blank"
              className="underline text-blue"
              href="https://peterspte.com/terms-conditions/"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              target="_blank"
              className="underline text-blue"
              href="https://peterspte.com/privacy-policy/"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        <button
          disabled={isLoading || !acceptPolicy}
          type="submit"
          className="text-base font-bold w-full py-3 bg-primary disabled:opacity-70 mt-10 flex items-center justify-center gap-x-3"
        >
          {isLoading && (
            <div className="w-5 h-5 rounded-full border-t-2 border-r-2 border-white animate-spin" />
          )}
          Make Payment
        </button>
      </form>
      {open?.state && <CheckoutModal open={open} setOpen={setOpen} />}
    </Layout>
  );
}

export default Checkout;

const CheckoutModal = ({ open, setOpen }) => {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState({});
  useEffect(() => {
    const getPaymentData = async () => {
      try {
        const res = await axios.get(`/payment/${open?.pid}/details`);
        setPaymentData(res?.data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };
    open?.pid !== null &&
      router?.isReady &&
      open?.status === "success" &&
      getPaymentData();
  }, [open?.pid, router?.isReady, open?.status]);

  return (
    <CustomModal
      visible={open?.state}
      onClose={() => setOpen({ state: false, pid: null, status: null })}
    >
      <div
        // ref={modalContentRef}
        className={`${
          open?.status === "success" ? "bg-[#00AA01]" : "bg-red"
        }  h-[130px] relative`}
      >
        <h1 className="text-lg font-extrabold text-white p-5">
          Payment details
        </h1>
        <div
          className={`bg-white ${
            open?.status === "success" ? "text-[#00AA01]" : "text-red"
          }  w-14 h-14 rounded-full absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center justify-center text-5xl`}
        >
          {open?.status === "success" ? <FaCheckCircle /> : <IoClose />}
        </div>
      </div>
      {/* action */}
      <div className="text-center mt-10 flex flex-col items-center justify-center">
        <p className="text-2xl font-extrabold">
          Payment {open?.status === "success" ? "Successful" : "Failed"}
        </p>
        <p className="text-sm text-[#5F646D] font-medium">
          Order Id #{paymentData?.order_details?.id}
        </p>
        <p
          className={`${
            open?.status === "success" ? "bg-[#98e9ab]" : "bg-[#e99898]"
          }  text-xs font-bold py-1 px-6 mt-1`}
        >
          {open?.status === "success" ? "Paid" : "Unpaid"}
        </p>
      </div>
      {/* order Details */}
      <div className="flex justify-between pt-5 px-5">
        <div>
          <p className="text-xs font-medium text-[#5F646D]">Order Details</p>
          <p className="text-base font-medium ">
            {paymentData?.order_details?.title}
          </p>
          <p className="text-base font-medium ">
            {paymentData?.order_details?.package}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-[#5F646D]">Amount</p>
          <p className="text-base font-medium ">
            {paymentData?.order_details?.amount} BDT
          </p>
        </div>
      </div>
      <hr className="border-b border-dashed border-black my-6 mx-5" />
      {/* Billing Details */}
      <div className="flex justify-between pb-5 px-5">
        <div>
          <p className="text-xs font-medium text-[#5F646D]">Billing Address</p>
          <p className="text-base font-medium ">
            {paymentData?.billing_address?.name}
          </p>
          <p className="text-base font-medium ">
            {paymentData?.billing_address?.email}
          </p>
          <p className="text-base font-medium ">
            {paymentData?.billing_address?.address}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-[#5F646D]">Payment Method</p>
          <p className="text-base font-medium ">
            {paymentData?.billing_address?.card_type}
          </p>
        </div>
      </div>
      {/* button */}
      {open?.status === "success" && (
        <div className="flex justify-end px-5 pb-5">
          <button className="flex items-center justify-between gap-x-2 py-3 px-10 text-base font-semibold border border-black dark:border-white rounded-md">
            Print <AiFillPrinter />
          </button>
        </div>
      )}
    </CustomModal>
  );
};
