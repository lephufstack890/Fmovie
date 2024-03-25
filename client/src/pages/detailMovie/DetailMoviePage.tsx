import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./DetailMoviePage.scss";
import { IoIosArrowForward } from "react-icons/io";
import { useGetMoviesQuery } from "@/services/movies/movies.services";
import { Category } from "@/services/categories/categories.interface";

const DetailMoviePage: React.FC = () => {
    const { id } = useParams()
    const {data: movie} = useGetMoviesQuery(id!)
    const [activeTab, setActiveTab] = useState(0); // State để lưu trữ tab hiện tại đang được chọn

    // Hàm xử lý sự kiện khi tab được click
    const handleTabClick = (index: number) => {
        setActiveTab(index); // Cập nhật tab hiện tại
    };
    
    return (
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
                            <img
                                className="rounded-4"
                                src={movie?.data.image}
                                alt=""
                            />
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
                                    {movie?.data.detail.categories.map((category:Category) => category.name).join(', ')}
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
                <li className={activeTab === 0 ? "activeTab" : ""}>
                    <NavLink
                        to=""
                        onClick={() => handleTabClick(0)}
                        className="text-black text-decoration-none"
                    >
                        <span
                            className="text-black fw-bold"
                            style={{ fontSize: "38px" }}
                        >
                            23
                        </span>
                        /02 - T4
                    </NavLink>
                </li>
                <li className={activeTab === 1 ? "activeTab" : ""}>
                    <NavLink
                        to=""
                        onClick={() => handleTabClick(1)}
                        className="text-black text-decoration-none"
                    >
                        <span
                            className="text-black fw-bold"
                            style={{ fontSize: "38px" }}
                        >
                            24
                        </span>
                        /02 - T5
                    </NavLink>
                </li>
                <li className={activeTab === 2 ? "activeTab" : ""}>
                    <NavLink
                        to=""
                        onClick={() => handleTabClick(2)}
                        className="text-black text-decoration-none"
                    >
                        <span
                            className="text-black fw-bold"
                            style={{ fontSize: "38px" }}
                        >
                            25
                        </span>
                        /02 - CN
                    </NavLink>
                </li>
                <li className={activeTab === 3 ? "activeTab" : ""}>
                    <NavLink
                        to=""
                        onClick={() => handleTabClick(3)}
                        className="text-black text-decoration-none"
                    >
                        <span
                            className="text-black fw-bold"
                            style={{ fontSize: "38px" }}
                        >
                            26
                        </span>
                        /02 - T2
                    </NavLink>
                </li>
                <li className={activeTab === 4 ? "activeTab" : ""}>
                    <NavLink
                        to=""
                        onClick={() => handleTabClick(4)}
                        className="text-black text-decoration-none"
                    >
                        <span
                            className="text-black fw-bold"
                            style={{ fontSize: "38px" }}
                        >
                            27
                        </span>
                        /02 - T2
                    </NavLink>
                </li>
                <li className={activeTab === 5 ? "activeTab" : ""}>
                    <NavLink
                        to=""
                        onClick={() => handleTabClick(5)}
                        className="text-black text-decoration-none"
                    >
                        <span
                            className="text-black fw-bold"
                            style={{ fontSize: "38px" }}
                        >
                            28
                        </span>
                        /02 - T3
                    </NavLink>
                </li>
            </ul>
            {activeTab === 0 && (
                <div>
                    <span className="subtitle">2D phụ đề</span>
                    <ul className="list-time mt-2">
                        <li className="item-time">
                            <span>9:30</span>
                            <span>164 ghế trống</span>
                        </li>
                        <li className="item-time">
                            <span>9:30</span>
                            <span>164 ghế trống</span>
                        </li>
                        <li className="item-time">
                            <span>9:30</span>
                            <span>164 ghế trống</span>
                        </li>
                        <li className="item-time">
                            <span>9:30</span>
                            <span>164 ghế trống</span>
                        </li>
                        <li className="item-time">
                            <span>9:30</span>
                            <span>164 ghế trống</span>
                        </li>
                    </ul>
                </div>
            )}
            {activeTab === 1 && <h2>tab 1</h2>}
            {activeTab === 2 && <h2>tab 2</h2>}
            {activeTab === 3 && <h2>tab 3</h2>}
            {activeTab === 4 && <h2>tab 4</h2>}
            {activeTab === 5 && <h2>tab 5</h2>}
        </div>
    );
};

export default DetailMoviePage;
