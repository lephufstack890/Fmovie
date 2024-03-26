import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';
import { FaTag } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetDayMovieListQuery } from "@/services/daymovie/daymovies.services";
import { loadDayMovieList } from "@/services/daymovie/daymoviesSlices";
import { useGetShowTimeListQuery } from "@/services/schedule/schedules.services";
import { loadShowTimeList } from "@/services/schedule/schedulesSlices";

const SchedulePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const movieState = useAppSelector((state) => state.showtimes.showtimes);
    const daymovieState = useAppSelector((state) => state.daymovies.daymovies);
    const [activeTab, setActiveTab] = useState<number>(1);

    const {
        data: showtime,
        isLoading: isShowTimeListLoading,
        isSuccess: isShowTimeListSuccess,
    } = useGetShowTimeListQuery([]);

    useEffect(() => {
        if (showtime) {
            dispatch(loadShowTimeList(showtime.data));
        }
    }, [dispatch, showtime, isShowTimeListSuccess]);

    const {
        data: daymovie,
        isLoading: isDayMovieListLoading,
        isSuccess: isDayMovieListSuccess,
    } = useGetDayMovieListQuery([]);

    useEffect(() => {
        if (daymovie) {
            dispatch(loadDayMovieList(daymovie.data));
        }
    }, [dispatch, daymovie, isDayMovieListSuccess]);

    const handleTabClick = (id: number) => {
        setActiveTab(id);
    };

    let selectedData: any = "";

    if (movieState) {
        selectedData = movieState.find((item: any) => item?.id === activeTab);
    }

    const handleNavLinkClick = (id: string) => {
        localStorage.setItem('hiddenInfo', id);
    };

    return (
        <div className='container'>
            <ul className="nav nav-tabs dayofweek mb-4">
                {daymovieState?.map((item: any, index: number) => (
                    <li key={index} className={activeTab === item?.id ? 'activeTab' : ''}>
                        <NavLink to="" onClick={() => handleTabClick(item?.id)} className='text-black text-decoration-none'>
                            <span className='text-black fw-bold' style={{ fontSize: '38px' }}>{item?.day}</span>/{item?.month_rank}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div>
                {selectedData && (
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 mb-3" style={{ borderBottom: '1px solid #ccc' }}>
                            <div className='row mb-3'>
                                <div className="col-lg-3 col-md-4 col-12">
                                    <img className='rounded-4' src={selectedData?.movies?.image} alt="" />
                                </div>
                                <div className="col-lg-9 col-md-9 col-12 content">
                                    <h2 className="fw-bold title">
                                        <NavLink className={cn('text-[#03599d]')} to="/schedule/123">
                                            {selectedData?.movies.name}
                                        </NavLink>
                                    </h2>
                                    <div className="d-flex align-items-center mb-4">
                                        <span className='d-flex align-items-center fw-bold pr-4'>
                                            <FaTag style={{ color: '#337ab7' }} />
                                            {selectedData?.movies.categories.join(', ')}
                                        </span>
                                        <span className='d-flex align-items-center fw-bold'>
                                            <IoTime style={{ color: '#337ab7' }} />
                                            {selectedData?.movies.time} phút
                                        </span>
                                    </div>
                                    <span className="subtitle">2D phụ đề</span>
                                    <ul className="list-time mt-2">
                                        {selectedData?.movies?.time_shows.map((item: any, index: number) => (
                                            <li key={index} className="item-time">
                                                <NavLink
                                                    to={`/ticket/${item?.id}`}
                                                    onClick={() => handleNavLinkClick(selectedData?.id)}
                                                    className='text-decoration-none text-black'
                                                >
                                                    <span>{item?.name}</span>
                                                </NavLink>
                                                <span>{item?.available_seats} ghế trống</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <h2 className='text-center fw-bold'><span className='title-swiper'>PHIM SẮP CHIẾU</span></h2>
                <Swiper
                    className='my-4'
                    spaceBetween={20}
                    slidesPerView={6}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <img src="https://files.betacorp.vn/files/media/images/2024/02/19/gozzila-170719-190224-68.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://files.betacorp.vn/files/media/images/2024/01/26/biet-doi-san-rong-144514-260124-27.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://files.betacorp.vn/files/media/images/2024/01/09/kungfu-panda-161211-090124-15.png" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://files.betacorp.vn/files/media/images/2024/02/19/dune-160329-190224-11.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://files.betacorp.vn/files/media/images/2024/02/19/ba-thim-bao-thu-162008-190224-98.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://files.betacorp.vn/files/media/images/2024/02/19/sen-boss-sum-vay-155653-190224-82.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://files.betacorp.vn/files/media/images/2024/02/19/gozzila-170719-190224-68.jpg" alt="" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default SchedulePage;

