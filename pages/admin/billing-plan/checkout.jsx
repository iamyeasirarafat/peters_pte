import Layout from "@/components/Layout";
import Field from "@/components/Field";
import Select from "@/components/Select";
import { useForm } from "react-hook-form";
import Image from "@/components/Image";
import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import CustomModal from "@/components/CustomModal";
const accountsType = [
  {
    id: "1",
    title: "Premium 7 Days",
  },
  {
    id: "2",
    title: "Premium 15 Days",
  },
  {
    id: "3",
    title: "Premium 30 Days",
  },
  {
    id: "4",
    title: "Premium 90 Days",
  },
  {
    id: "5",
    title: "25x Full Mocktest",
  },
  {
    id: "6",
    title: "50x Full Mocktest",
  },
  {
    id: "7",
    title: "100x Full Mocktest",
  },
  {
    id: "8",
    title: "250x Full Mocktest",
  },
];
const accountsCount = [
  {
    id: "1",
    title: "7 Account Pack",
  },
  {
    id: "2",
    title: "15 Account Pack",
  },
  {
    id: "3",
    title: "30 Account Pack",
  },
  {
    id: "4",
    title: "90 Account Pack",
  },
];
const paymentMethods = [
  { id: 1, title: "SSL Commerce" },
  { id: 2, title: "Stripe" },
];
function Checkout() {
  const [open, setOpen] = useState(false);
  const [accountType, setAccountType] = useState(accountsType[0]);
  const [accountCount, setAccountCount] = useState(accountsCount[0]);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {};
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
          placeholder="5950.00 BDT"
          currency="You saved 15 BDT"
          required
          register={register}
          name="total_cost"
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
        <p className="text-[#949494] pt-2 flex items-center gap-x-2">
          <BsCheck2 />
          By making payment you are agreed to our Terms & Conditions and Privacy
          Policy
        </p>
        <button
          onClick={() => setOpen(true)}
          type="submit"
          className="text-base font-bold w-full py-3 bg-primary mt-10"
        >
          Make Payment
        </button>
      </form>
      <CheckoutModal open={open} setOpen={setOpen} />
    </Layout>
  );
}
export default Checkout;

const CheckoutModal = ({ open, setOpen }) => {
  return (
    <CustomModal visible={open} onClose={() => setOpen(false)}>
      <div className="bg-[#00AA01] h-[130px] relative">
        <h1 className="text-lg font-extrabold text-white p-5">
          Payment details
        </h1>
        <div className="bg-white text-[#00AA01] w-14 h-14 rounded-full absolute -bottom-7 left-1/2 -translate-x-1/2 flex items-center justify-center text-5xl">
          <FaCheckCircle />
        </div>
      </div>
      {/* action */}
      <div className="text-center mt-10 flex flex-col items-center justify-center">
        <p className="text-2xl font-extrabold">Payment Successful</p>
        <p className="text-sm text-[#5F646D] font-medium">Order Id #45897</p>
        <p className="bg-[#98e9ab] text-xs font-bold py-1 px-6 mt-1">Paid</p>
      </div>
      {/* order Details */}
      <div className="flex justify-between pt-5 px-5">
        <div>
          <p className="text-xs font-medium text-[#5F646D]">Order Details</p>
          <p className="text-base font-medium ">Premium 30 Days Account</p>
          <p className="text-base font-medium ">7 Days Pack</p>
        </div>
        <div>
          <p className="text-xs font-medium text-[#5F646D]">Amount</p>
          <p className="text-base font-medium ">5904 BDT</p>
        </div>
      </div>
      <hr className="border-b border-dashed border-black my-6 mx-5" />
      {/* Billing Details */}
      <div className="flex justify-between pb-5 px-5">
        <div>
          <p className="text-xs font-medium text-[#5F646D]">Billing Address</p>
          <p className="text-base font-medium ">
            Tushar Ahmed | Score Gain PTE
          </p>
          <p className="text-base font-medium ">tusha987@gmail.com</p>
          <p className="text-base font-medium ">Dhaka Bangladesh</p>
        </div>
        <div>
          <p className="text-xs font-medium text-[#5F646D]">Payment Method</p>
          <p className="text-base font-medium ">SSL Commerce</p>
        </div>
      </div>
      {/* button */}
      <div className="flex justify-end px-5 pb-5">
        <button className="flex items-center justify-between gap-x-2 py-3 px-10 text-base font-semibold border border-black dark:border-white rounded-md">
          Print <AiFillPrinter />
        </button>
      </div>
    </CustomModal>
  );
};
