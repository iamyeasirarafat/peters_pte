import Link from 'next/link';
import React from 'react';
import { BiBookAlt } from "react-icons/bi";
import { BsBook, BsMic } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
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
    return (
        <div className='my-20'>
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
                            key={index}
                            style={{ backgroundColor: item.bgcolor }}
                            className={`bg-[#F2B277] text-white flex flex-col h-[97px] w-full rounded-[10px] p-[12px] justify-center items-center`}
                        >
                            <p className="capitalize text-[21px] pb-1">{item.name}</p>
                            <div className="flex justify-center items-center ">{item.icon}</div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default StudyMaterial
