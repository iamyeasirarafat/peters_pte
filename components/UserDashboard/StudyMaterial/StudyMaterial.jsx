import Link from 'next/link';
import React, { useState } from 'react';
import { BiBookAlt } from "react-icons/bi";
import { BsBook, BsMic } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import { FiLayout, FiMonitor } from "react-icons/fi";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import ReusableModal from "../../global/ReusableModal";

const studyMaterials = [
    {
        bgcolor: "#00B4D8",
        name: "Template",
        href: "/app/template",
        icon: <BiBookAlt className="h-10 w-10" />
    },
    {
        bgcolor: "#949494",
        name: "Prediction",
        href: "/app/prediction",
        icon: <RxDashboard className="h-10 w-10" />
    },
    {
        bgcolor: "#F44141",
        name: "Mocktest",
        href: "/app/practice/mock_test",
        icon: <BsMic className="h-10 w-10" />
    },
    {
        bgcolor: "#3EC70B",
        name: "Compatibility",
        icon: <FiMonitor className="h-10 w-10" />
    },
    {
        bgcolor: "#2D46B9",
        name: "Study Material",
        href: "/app/study-material",
        icon: <BsBook className="h-10 w-10" />
    }

]

const StudyMaterial = () => {
    const [compatibility, setCompatibility] = useState(false)
    return (
        <div className='my-10 md:my-20'>
            <h2 className="text-4xl font-normal mb-3 capitalize">study material</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {/* card  */}
                {studyMaterials?.map((item, index) => {
                    if (item?.href) {
                        return (
                            <Link
                                href={item?.href}
                                key={index}
                                style={{ backgroundColor: item.bgcolor }}
                                className={`bg-[#F2B277] text-white flex flex-col h-[97px] w-full rounded-[10px] p-[12px] justify-center items-center`}
                            >
                                <p className="capitalize text-[21px] pb-1">{item.name}</p>
                                <div className="flex justify-center items-center ">{item.icon}</div>
                            </Link>
                        )
                    }
                    return (
                        <div
                            onClick={() => setCompatibility(true)}
                            key={index}
                            style={{ backgroundColor: item.bgcolor }}
                            className={`bg-[#F2B277] text-white flex flex-col h-[97px] w-full rounded-[10px] p-[12px] justify-center items-center cursor-pointer`}
                        >
                            <p className="capitalize text-[21px] pb-1">{item.name}</p>
                            <div className="flex justify-center items-center ">{item.icon}</div>
                        </div>
                    )
                })}

            </div>
            <Compatibility compatibility={compatibility} setCompatibility={setCompatibility} />
        </div>
    )
}

export default StudyMaterial

const Compatibility = ({ compatibility, setCompatibility }) => {
    return (

        <ReusableModal open={compatibility} setOpen={setCompatibility}>
            <div className="border border-primary rounded-[20px] bg-white ">
                <div className="bg-[#00B4D8] rounded-t-[15px] py-2 px-6 md:flex justify-between items-center text-xl font-normal">
                    <h3>Compability</h3>
                    <FaXmark
                        onClick={() => setCompatibility(false)}
                        className="bg-[#FFFFFF] text-gray-800 text-4xl rounded-full hidden sm:block  cursor-pointer" />
                </div>
                <div className="grid md:grid-rows-2 p-8 space-y-3">
                    <div className="flex flex-col md:flex-row gap-3">
                        <DesignComponent
                            color={"#C9FEF5"}
                            header="Recommended Browser"
                            title="Google Chrome & FireFox"
                            description="You’re Using Firefox"
                        />
                        <DesignComponent
                            color={"#F4D1B1"}
                            header="Best Resolution"
                            title="1366 X 768 and above"
                            description="Your Resolution Is 1920 x 1080"
                        />
                    </div>
                    <div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-3  ">
                        <DesignComponent
                            color={"#D3FFD5"}
                            title="Cookies"
                            description="Cookies Is Enabled"
                        />
                        <DesignComponent
                            color={"#F4D1B1"}
                            title="Java Script"
                            description="Java Script IsEnabled"
                        />
                        <DesignComponent
                            color={"#5AB2FF"}
                            title="Microphone Status"
                            description="Microphone Is Disabled"
                        />
                        <DesignComponent
                            color={"#FFE0E0"}
                            title="Speaker Status"
                            description="Speaker Is Disabled"
                        />
                    </div>
                </div>
            </div>
        </ReusableModal>
    )
}


const DesignComponent = ({
    header = "",
    title,
    description,
    icon,
    color,
}) => {
    return (
        <div
            className=" w-full text-gray-600 text-center p-3 space-y-3 rounded-xl relative"
            style={{ backgroundColor: color }}
        >
            <div className="w-full p-2">
                <h1>{header}</h1>
                <FiLayout className="text-gray-600 w-16 h-16 mx-auto" />
                <h1 className="font-normal">{title}</h1>
                <p className="text-sm font-normal">{description}</p>
            </div>
            <IoCheckmarkOutline
                className="bg-green-500 text-white sm:text-2xl md:text-3xl lg:4xl rounded-md mx-auto 
          absolute top-0 right-2 md:right-2.5"
            />
        </div>
    )
} 
