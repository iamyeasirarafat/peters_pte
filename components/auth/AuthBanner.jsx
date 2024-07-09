import Image from "next/image";
import { BsStarFill } from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const authSliderContent = [
  {
    review:
      "I can't express how grateful I am for Peter's PTE. The AI analysis and scoring feature is incredibly accurate and has helped me understand my mistakes and improve my English skills. The study materials and question library are comprehensive, making my practice sessions very effective",
    name: "Zahud Salamir",
    marks: "90",
  },
  {
    review:
      "Peter's PTE is a true gem for PTE test takers. The study guide and materials are comprehensive and well-structured. The 10,000+ question library ensures that you'll never run out of practice.",
    name: "Nafis Sadaat",
    marks: "87",
  },
  {
    review:
      "The AI feedback is invaluable in helping you understand your weaknesses. The software's ability to customize a study plan based on your performance is impressive. This is a must-have tool for anyone aiming for a high score in the PTE test.",
    name: "Sampad Tripadi",
    marks: "90",
  },
];

const AuthBanner = () => {
  // swiper pagination
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span className="' + className + '">' + "</span>";
    },
  };
  return (
    <div className="hidden lg:block w-1/2 h-full relative">
      <div className="px-16 pt-16 h-full bg-secondary">
        <div className="h-full">
          <Swiper
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={1000}
            pagination={pagination}
            modules={[Pagination, Autoplay]}
            className="mySwiper h-full"
          >
            {authSliderContent?.map((item, i) => (
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
                <p className="text-3xl mt-3">{item?.review}</p>
                <p className="text-base font-medium mt-7">
                  - by {item?.name}, Scored {item?.marks} in PTE Exam
                </p>
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 w-full h-2/4">
                  <div className="w-full h-full relative">
                    <Image
                      className="object-contain"
                      src="/Peterpte_universe.png"
                      fill
                      alt="auth image"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
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
  );
};

export default AuthBanner;
