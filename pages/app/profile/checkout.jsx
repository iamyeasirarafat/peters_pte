import CustomModal from "@/components/CustomModal";
import Field from "@/components/Field";
import Image from "@/components/Image";
import Select from "@/components/Select";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillPrinter } from "react-icons/ai";
import { BsCheck2 } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import DashboardLayout from "../layout";

const paymentMethods = [{ id: 1, title: "SSL Commerce" }];
function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id, status } = router.query;
  const [open, setOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState({
    state: false,
    url: null,
  });
  const [pack, setPack] = useState([]);
  const [accountType, setAccountType] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  useEffect(() => {
    const getPackage = async () => {
      try {
        const res = await axios.get(`/packages/student`);
        setPack(res?.data);
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };
    router.isReady && getPackage();
  }, [id, router.isReady]);
  useEffect(() => {
    if (Array.isArray(pack) && pack.length > 0 && id) {
      const selectedAccountType = pack.find((item) => item.id === parseInt(id));
      setAccountType(selectedAccountType || {});
    }
  }, [pack, id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = {
      package: accountType?.id,
      coupon_code: data?.coupon_code,
    };
    try {
      const res = await axios.post("/payment/student", formData);
      setIsLoading(false);
      router.push(res?.data?.redirect_url);
      window.open(res?.data?.redirect_url, "_blank", "noopener,noreferrer");
      // setPaymentModalOpen({ state: true, url: res?.data?.redirect_url });
    } catch (error) {
      toast.error("Something went wrong");
      setIsLoading(false);
    }
  };
  console.log(status);
  useEffect(() => {
    if (router.isReady) {
      setOpen(status);
    }
  }, [router.isReady, status]);

  return (
    <DashboardLayout>
      <div className="mt-5">
        <h2 className="text-4xl text-gray">Checkout</h2>
        <div className="bg-secondary py-4 mt-3">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-full xl:w-2/3 w-1/2 mx-auto flex flex-col gap-3"
          >
            <Select
              label="Bulk Account Type"
              items={pack}
              value={accountType}
              onChange={setAccountType}
            />
            <Field
              errors={errors}
              label="Coupon Code"
              placeholder="Coupon Code"
              register={register}
              name="coupon_code"
            />
            <Field
              errors={errors}
              label="Total Cost"
              placeholder={`${accountType?.cost} BDT`}
              currency={`You Saved ${
                accountType?.pre_price - accountType?.cost
              } BDT`}
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
            <p className="text-[#949494] pt-2 flex items-center gap-x-2">
              <BsCheck2 />
              By making payment you are agreed to our Terms & Conditions and
              Privacy Policy
            </p>
            <button
              disabled={isLoading}
              type="submit"
              className="text-base font-bold w-full py-3 bg-primary mt-10 flex items-center justify-center gap-x-3"
            >
              {isLoading && (
                <div className="w-5 h-5 rounded-full border-t-2 border-r-2 border-white animate-spin" />
              )}
              Make Payment
            </button>
          </form>
          <CheckoutModal open={open} setOpen={setOpen} />
          <PaymentModal open={paymentModalOpen} setOpen={setPaymentModalOpen} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Checkout;

const PaymentModal = ({ open, setOpen }) => {
  return (
    <CustomModal
      visible={open?.state}
      onClose={() => setOpen({ state: false, url: null })}
    >
      <div className="h-[720px] bg-white">
        <iframe
          className="w-full h-full"
          // src={open?.url}
          src={open?.url}
          allowFullScreen
        ></iframe>
        <div className="w-full bg-white p-3">
          <button
            onClick={() => setOpen({ state: false, url: null })}
            className="py-2 px-3 bg-red text-white rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

const CheckoutModal = ({ open, setOpen }) => {
  return (
    <CustomModal visible={open ? true : false} onClose={() => setOpen(false)}>
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
