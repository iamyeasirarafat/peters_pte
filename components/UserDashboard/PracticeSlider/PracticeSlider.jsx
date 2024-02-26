import React, { Suspense, useEffect, useRef, useState } from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'
import { navItems } from "../../DashboardLayout/SideNav";

const PracticeSlider = () => {
    const carouselRef = useRef(null);
    const carouselItemRef = useRef(null);

    const moveCarousel = (direction) => {
        const scrollAmount = carouselItemRef.current.offsetWidth + 10; // Adjust 10 for gap
        if (direction === 'left') {
            carouselRef.current.scrollLeft -= scrollAmount;
        } else if (direction === 'right') {
            carouselRef.current.scrollLeft += scrollAmount;
        }
    };


    return (
        <div className="flex w-full h-[143px] justify-between items-center">
            {/* here row carousel bar goes */}
            <button
                onClick={() => moveCarousel("left")}
                className="cursor-pointer pr-[20px] z-2 bg-white"
            >
                <BsArrowLeftCircle size={48} />
            </button>
            {/* all items of carousel bar */}
            <div
                ref={carouselRef}
                className="flex gap-10 overflow-auto"
            >
                {
                    Object.keys(navItems).length > 0 && Object.keys(navItems)?.map((item, index) => {
                        return (
                            <Suspense fallback={<div>Loading...</div>}>
                                <div key={index} ref={carouselItemRef} className="carousel-item">
                                    <h4 className="text-[21px] font-semibold text-[#616161] capitalize">
                                        {item}
                                    </h4>
                                    <hr className="border border-[#616161] my-2" />
                                    <div className="flex gap-2">
                                        {
                                            navItems[item]?.map((subItem, index) => {
                                                return (
                                                    <button key={index} className={`relative w-[55px] h-[55px] bg-[${subItem?.bg === "gold" ? '#CF8800' : subItem?.bg === "primary" ? "#F2B277" : subItem?.bg === "cream" ? "#7DD8FF" : "#949494"}] rounded-[13px] text-white`}>
                                                        {
                                                            subItem?.ai && <span className="absolute -top-1 -right-1 text-[16px] font-normal w-[23px] h-[23px] bg-[#4399FF] rounded-full">
                                                                AI
                                                            </span>
                                                        }
                                                        <span className="text-[20px] font-semibold">{subItem?.icon}</span>
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </Suspense>
                        )
                    }
                    )
                }

            </div>
            <button
                onClick={() => moveCarousel("right")}
                className="cursor-pointer pl-[20px] z-2 bg-white"
            >
                <BsArrowRightCircle size={48} />
            </button>
        </div>
    )
}

export default PracticeSlider
