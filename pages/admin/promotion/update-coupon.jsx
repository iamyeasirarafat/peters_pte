import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import LoadingButton from "@/components/LoadingButton";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
export default function CreateCoupon() {
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState()
    const {
        handleSubmit,
        register,
        formState: {
            errors
        },
        reset
    } = useForm()
    const [data, setData] = useState()
    useEffect(() => {
        const coupon = JSON.parse(localStorage.getItem("coupon"))
        setData(coupon)
        reset(coupon)
        setType(coupon?.type)
    }, [reset])

    const router = useRouter()
    const options = [{
        title: "Percentage",
        value: "percentage"
    }, {
        title: "Fixed Amount ",
        value: "fixed"
    }]
    const onSubmit = (data) => {
        setLoading(true)
        try {
            axios.put("/coupon/" + data.id, { ...data, type: type })
            toast.success("Successfully Updated Coupon")
            setLoading(false)
            router.push("/admin/promotion")
        }
        catch (error) {
            console.log(error)
            toast.error("Something went wrong")
            setLoading(false)
        }
    }
    return (
        <Layout back title={`Promotion/CID ${data?.id}`}>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className=" flex flex-col gap-2">
                    <div className="flex justify-between">
                        <label for="title" className="font-bold text-sm">
                            Coupon Name
                        </label>
                        <h3 className="text-sm font-semibold">Coupon Id #785263891</h3>
                    </div>
                    <input
                        placeholder="7 Days Premium Access"
                        className="w-full border-none py-4 px-5 text-sm "
                        id="title"
                        type="text"
                        {...register("title", { required: "Title is required" })}
                    />
                </div>
                <div className=" flex flex-col gap-2">

                    <label for="code" className="font-bold text-sm">
                        Coupon Code
                    </label>
                    <input
                        placeholder="BX550"
                        className="w-full border-none py-4 px-5 text-sm "
                        id="code"
                        type="text"
                        {...register("code", { required: "code is required" })}
                    />
                </div>
                <div className="bg-white h-13 flex items-center pl-4">
                    <p className="text-sm font-bold mr-11 text-black">Type</p>
                    <div className="grid grid-cols-4">
                        {options?.map((option, i) => (
                            <div key={i}>
                                <label
                                    className={`group relative inline-flex items-start select-none cursor-pointer tap-highlight-color bg-white  py-3 pl-3 pr-12`}
                                >
                                    <input
                                        className="absolute top-0 left-0 opacity-0 invisible"
                                        type="checkbox"
                                        value={option.value}
                                        onChange={() => setType(option?.value)}
                                        checked={type == option.value}
                                    />
                                    <span
                                        className={`relative flex justify-center items-center shrink-0 w-5 h-5 border transition-colors dark:border-white group-hover:border-green-1 ${type == option.value
                                            ? "bg-green-1 border-green-1 dark:!border-green-1"
                                            : "bg-transparent border-n-1 dark:border-white"
                                            }`}
                                    >
                                        <Icon
                                            className={`fill-white transition-opacity ${type == option.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                                }`}
                                            name="check"
                                        />
                                    </span>
                                    <span className="ml-2.5 pt-0.75 text-xs font-bold text-n-1 dark:text-white">
                                        {option?.title}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=" flex flex-col gap-2">

                    <label for="amount" className="font-bold text-sm">
                        Amount
                    </label>
                    <input
                        placeholder="25"
                        className="w-full border-none py-4 px-5 text-sm "
                        id="amount"
                        type="text"
                        {...register("amount", { required: "amount is required" })}
                    />
                </div>
                <div className=" flex flex-col gap-2">

                    <label for="max_use" className="font-bold text-sm">
                        Usage Amount
                    </label>
                    <input
                        placeholder="25"
                        className="w-full border-none py-4 px-5 text-sm "
                        id="max_use"
                        type="text"
                        {...register("max_use", { required: "usage amount is required" })}
                    />
                </div>
                <div className="flex gap-5 w-full">
                    <div className=" flex flex-col gap-2 w-full">

                        <label for="start_date" className="font-bold text-sm">
                            Starting Date
                        </label>
                        <input
                            placeholder="25"
                            className="w-full border-none py-4 px-5 text-sm "
                            id="start_date"
                            type="date"
                            {...register("start_date", { required: "starting date is required" })}
                        />
                    </div>
                    <div className=" flex flex-col gap-2 w-full">

                        <label for="end_date" className="font-bold text-sm">
                            Ending Date
                        </label>
                        <input
                            placeholder="25"
                            className="w-full border-none py-4 px-5 text-sm "
                            id="end_date"
                            type="date"
                            {...register("end_date", { required: "ending date is required" })}
                        />
                    </div>
                </div>
                {!loading ? (
                    <button
                        type="submit"
                        className="h-10 w-full mt-5 text-sm font-bold last:mb-0 bg-orange-300 transition-colors hover:bg-n-3/10 dark:hover:bg-white/20"
                    >
                        Update Coupon
                    </button>
                ) : (
                    <LoadingButton />
                )}
            </form>
        </Layout>
    )
}
