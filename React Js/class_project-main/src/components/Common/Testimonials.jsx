import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  Pagination,
  Keyboard,
  Mousewheel,
} from "swiper/modules";

import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Testimonials({ testimonials }) {
  return (
    <section className="bg-[#f4f1ed] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">

          <button className="custom-prev absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition">
            <ChevronLeft size={22} />
          </button>

        
          <button className="custom-next absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition">
            <ChevronRight size={22} />
          </button>

          <Swiper
            modules={[
              Navigation,
              Pagination,
              Autoplay,
              Keyboard,
              Mousewheel,
            ]}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            keyboard={{
              enabled: true,
            }}
            mousewheel={true}
            slidesPerView={4}
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white rounded-lg p-6 h-[220px] flex flex-col justify-between shadow-sm">

                  <div>
                    <div className="text-3xl text-rose-300 font-bold">
                      ❝
                    </div>

                    <p className="text-gray-600 text-sm leading-6 mt-2">
                      {item.review}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <h4 className="font-semibold text-sm">
                          {item.name}
                        </h4>

                        <p className="text-xs text-gray-400">
                          {item.role}
                        </p>
                      </div>
                    </div>

                    <div className="text-yellow-400">
                      ★★★★★
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}