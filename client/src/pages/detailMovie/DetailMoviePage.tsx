import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./DetailMoviePage.scss";
import { cn } from "@/lib/utils";
import { IoIosArrowForward } from "react-icons/io";
import { useGetMoviesQuery } from "@/services/movies/movies.services";
import { Category } from "@/services/categories/categories.interface";
import Trailer from "../../components/trailer/Trailer";
import { Drawer, DrawerContent, DrawerTrigger } from "../../components/ui/drawer";
import { FaPlayCircle } from "react-icons/fa";

interface DayMovie {
    id: number;
    day: number;
    month_rank: string;
}

interface TimeShow {
    id: number,
    available_seats: number,
    name: string
}

const DetailMoviePage: React.FC = () => {
    const { id } = useParams()
    const {data: movie} = useGetMoviesQuery(id!)
    const [activeTab, setActiveTab] = useState(1); // State để lưu trữ tab hiện tại đang được chọn
    const [modal, setModal] = useState("");

    // Hàm xử lý sự kiện khi tab được click
    const handleTabClick = (id: number) => {
        setActiveTab(id); // Cập nhật tab hiện tại
    };

    
    return (
        <Drawer>
        <div className="container">
            <div className="flex items-center py-2 breadcrumb">
                <span className="text-[23px] !text-[#333] font-thin">
                    Trang chủ
                </span>
                <span className="!text-[#333] mx-1 w-5 h-5 mt-1  block flex items-center justify-center">
                    <IoIosArrowForward />
                </span>
                <span className="text-[23px]  font-thin !text-[#03599d]">
                    {movie?.data.name}
                </span>
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-12">
                            <DrawerTrigger className={cn('p-0 ')}>
                                <div className={cn('movie-item__image ') }>
                                    <img
                                        src={movie?.data.image}
                                        alt=""
                                    />
                                    <div
                                        onClick={() => setModal("trailer")}
                                        className="movie-item__overlay flex items-center justify-center"
                                    >
                                        <div className="play-icon flex items-center justify-center">
                                            <FaPlayCircle className="icon" />
                                        </div>
                                    </div>
                                </div>
                            </DrawerTrigger>
                        </div>
                        
                        <div className="col-lg-9 col-md-9 col-12 content">
                            <h2 className="fw-bold title">{movie?.data.name}</h2>
                            <div className="des py-2">
                                {movie?.data.description}
                            </div>
                            <div className="list-actors">
                                <div className="row">
                                    <span className="col-lg-4 fw-bold">
                                        ĐẠO DIỄN:
                                    </span>
                                    <span className="col-lg-8">{movie?.data.director }</span>
                                </div>
                                <div className="row">
                                    <span className="col-lg-4 fw-bold">
                                        DIỄN VIÊN:
                                    </span>
                                    <span className="col-lg-8">
                                        {movie?.data.actor}
                                    </span>
                                </div>
                                <div className="row">
                                    <span className="col-lg-4 fw-bold">
                                        THỂ LOẠI: 
                                    </span>
                                    <span className="col-lg-8">
                                    {movie?.data?.id_category.map((category) => category.name).join(', ')}
                                    </span>
                                </div>
                                <div className="row">
                                    <span className="col-lg-4 fw-bold">
                                        THỜI LƯỢNG:
                                    </span>
                                    <span className="col-lg-8">{movie?.data.time} phút</span>
                                </div>
                                <div className="row">
                                    <span className="col-lg-4 fw-bold">
                                        NGÔN NGỮ:
                                    </span>
                                    <span className="col-lg-8">{movie?.data.language}</span>
                                </div>
                                <div className="row">
                                    <span className="col-lg-4 fw-bold">
                                        NGÀY KHỞI CHIẾU:
                                    </span>
                                    <span className="col-lg-8">{movie?.data.releaseDate}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="nav nav-tabs dayofweek mb-4 justify-content-start">
            {movie?.data.day_movies.map((item: DayMovie, index: number) => (
                <li key={index} className={activeTab === item?.id ? "activeTab" : ""}>
                    <NavLink
                        to=""
                        onClick={() => handleTabClick(item?.id )}
                        className="text-black text-decoration-none"
                    >
                        <span
                            className="text-black fw-bold"
                            style={{ fontSize: "38px" }}
                        >
                            {item?.day}
                        </span>
                        /{item?.month_rank}
                    </NavLink>
                </li>
            ))}
            </ul>
            <h3 className="pl-[15px] text-[18px] text-[#333] uppercase font-normal">
                2D Phụ đề
            </h3>
            <div className="flex mb-4">
                    {movie?.data.time_shows.map((item: TimeShow, index: number) => (
                        <div key={index} className='mr-4'>
                            <NavLink to={`/ticket/${item?.id}`} className="px-[5px] text-[#333] cursor-pointer">
                                <div className="bg-[#E5E5E5] text-[#333] text-center text-sm py-1">
                                    {item?.name}
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-normal text-center px-4"
                                    )}
                                >
                                    {item?.available_seats} ghế trống
                                </span>
                            </NavLink>
                        </div>
                    ))}
            </div>
            {modal !== "trailer" ? (
                <DrawerContent
                    className={cn(
                        "mx-auto top-[18%]  fixed max-w-[1000px] w-full transform  h-[500px] overflow-hidden"
                    )}
                >
                    {/* <Showtime idMovie={idMovie}/> */}
                </DrawerContent>
            ) : (
                <DrawerContent
                    className={cn(
                        "mx-auto top-[18%] fixed max-w-[50%] w-full transform  max-h-[530px] overflow-hidden"
                    )}
                >
                    <Trailer trailer={movie?.data?.trailer?.url} name={movie?.data?.name} />
                </DrawerContent>
                )}
        </div>
        </Drawer>
    );
};

export default DetailMoviePage;
