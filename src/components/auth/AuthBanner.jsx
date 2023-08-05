import Image from "next/image";
import React from "react";
import { BsStarFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const AuthBanner = () => {
  // swiper pagination
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "</span>";
    },
  };
  return (
    <div className="hidden w-1/2 h-full">
      <div className="px-16 pt-16 h-full bg-[#FFF4EB]">
        <div className="h-full relative">
          <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper h-full"
          >
            <SwiperSlide>
              {/* star icon */}
              <div className="flex items-center gap-x-1">
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
              </div>
              {/* text */}
              <p className="text-3xl mt-3">
                As an international student planning to pursue higher education,
                I knew I had to take the PTE exam to prove my English language
                proficiency. To prepare for this crucial test, I decided to try
                out Peters PTE mock test software, and I can confidently say it
                has been an invaluable asset in my preparation journey.
              </p>
              <p className="text-base font-medium mt-7">
                - Tia Giamory, Scored 82 in PTE Exam
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50 w-[500px] h-[650px]">
                <div className="w-full h-full relative">
                  <Image
                    className="object-cover"
                    src="/auth-image.png"
                    fill
                    alt="auth image"
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* star icon */}
              <div className="flex items-center gap-x-1">
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
              </div>
              {/* text */}
              <p className="text-3xl mt-3">
                As an international student planning to pursue higher education,
                I knew I had to take the PTE exam to prove my English language
                proficiency. To prepare for this crucial test, I decided to try
                out Peters PTE mock test software, and I can confidently say it
                has been an invaluable asset in my preparation journey.
              </p>
              <p className="text-base font-medium mt-7">
                - Tia Giamory, Scored 82 in PTE Exam
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50 w-[500px] h-[650px]">
                <div className="w-full h-full relative">
                  <Image
                    className="object-cover"
                    src="/auth-image.png"
                    fill
                    alt="auth image"
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* star icon */}
              <div className="flex items-center gap-x-1">
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
                <BsStarFill className="text-xl" />
              </div>
              {/* text */}
              <p className="text-3xl mt-3">
                As an international student planning to pursue higher education,
                I knew I had to take the PTE exam to prove my English language
                proficiency. To prepare for this crucial test, I decided to try
                out Peters PTE mock test software, and I can confidently say it
                has been an invaluable asset in my preparation journey.
              </p>
              <p className="text-base font-medium mt-7">
                - Tia Giamory, Scored 82 in PTE Exam
              </p>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50 w-[500px] h-[650px]">
                <div className="w-full h-full relative">
                  <Image
                    className="object-cover"
                    src="/auth-image.png"
                    fill
                    alt="auth image"
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          {/* login page bg shape */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 w-full h-[391px]">
            <div className="w-full h-full relative">
              <Image
                className="object-cover"
                src="/bg-shape.png"
                fill
                alt="auth image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthBanner;
