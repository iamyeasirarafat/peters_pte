import React from 'react'
import { Progress } from 'rsuite'

const CircularProgressWidget = ({ data }) => {
    const { title, value, percentage, strokeColor, trailColor } = data || {}

    return data ? <div className={`flex border-cream justify-between items-center py-2 px-3 w-full md:w-auto min-h-[74px] gap-2 capitalize border border-[${strokeColor}] rounded-[10px]`}>
        <div className=" flex flex-col justify-between h-full  w-[70%]">
            <p className={`text-[#949494] leading-[16px] text-[16px] md:text-[13px] lg:text-[16px] font-normal`}>{title}</p>
            <span style={{ color: strokeColor }} className={`text-[16px] font-normal`}>{value}</span>
        </div>
        {/* circular progress bar */}
        <div className='w-[30%]' style={{
            width: 60,
        }}>
            <Progress.Circle className={`[&>.rs-progress-circle-info]:!text-[${strokeColor && strokeColor}] [&>.rs-progress-circle-info]:!text-[12px] [&>.rs-progress-circle-info]:!h-[25px]`} percent={percentage} strokeColor={strokeColor} trailColor={trailColor} strokeLinecap="square" trailWidth={20} strokeWidth={20} />
        </div>
    </div> : null
}

export default CircularProgressWidget
