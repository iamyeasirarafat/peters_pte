import React from 'react'
import { BiBookAlt } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { BsMic, BsBook } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
const studyMaterials = [
    {
        bgcolor: "#F2B277",
        name: "Template",
        icon: <BiBookAlt className="h-10 w-10" />
    },
    {
        bgcolor: "#949494",
        name: "Prediction",
        icon: <RxDashboard className="h-10 w-10" />
    },
    {
        bgcolor: "#F44141",
        name: "Mocktest",
        icon: <BsMic className="h-10 w-10" />
    },
    {
        bgcolor: "#849C3E",
        name: "Compatibility",
        icon: <FiMonitor className="h-10 w-10" />
    },
    {
        bgcolor: "#4399FF",
        name: "Study Material",
        icon: <BsBook className="h-10 w-10" />
    }

]

const StudyMaterial = () => {
    return (
        <div className='my-5'>
            <h2 className="text-4xl font-normal mb-3 capitalize">study material</h2>
            <div className="flex gap-2 w-full flex-wrap justify-between ">
                {/* card  */}
                {studyMaterials?.map((item, index) => (<div
                    key={index}
                    style={{ backgroundColor: item.bgcolor }}
                    className={`bg-[#F2B277] text-white flex flex-col h-[97px] min-w-[235px] rounded-[10px] p-[12px] justify-center items-center`}
                >
                    <p className="capitalize text-[21px] pb-1">{item.name}</p>
                    <div className="flex justify-center items-center ">{item.icon}</div>
                </div>))}

            </div>
        </div>
    )
}

export default StudyMaterial
