import React from 'react'

const LineProgressWidget = ({ data }) => {
    const { title, value, percentage, color } = data || {}
    return (
        <div className="flex flex-col items-start p-3 gap-2 capitalize border border-[#CF8800] rounded-[10px]">
            <p>{title}</p>
            <span style={{ color: color }} className={` text-[36px] font-semibold`}>{value}</span>
            {/* line progress bar */}
            <div className="w-full h-[8px] bg-[#FFF4EB] rounded-[10px]">
                <div style={{ background: color }} className={`w-[${percentage}] h-full  rounded-[10px]`} />
            </div>
        </div>
    )
}

export default LineProgressWidget
