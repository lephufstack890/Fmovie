import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { ListMovie } from "../../components";


const HomePage: React.FC = () => {


    return (
        <div className=" homepage">
            <Swiper
                className="my-4"
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
            >
                <SwiperSlide>
                    <img
                        src="https://files.betacorp.vn/files/ecm/2024/02/21/1702x621-2-163855-210224-73.png"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src="https://files.betacorp.vn/files/ecm/2024/01/23/0124-movie-galaxy-merchant-tet-1702x621-113434-230124-48.jpg"
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>
            <ListMovie />
        </div>
    );
};

export default HomePage;
