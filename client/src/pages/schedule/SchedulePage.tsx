import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';
import { FaTag } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import moment from 'moment';

import {
    useGetShowTimeListQuery,
} from "@/services/schedule/schedules.services";
import { loadShowTimeList } from "@/services/schedule/schedulesSlices";

const SchedulePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const movieState = useAppSelector(
        (state) => state.showtimes.showtimes
    );
    console.log(movieState);

    const {
        data: showtime,
        isLoading: isShowTimeListLoading,
        isSuccess: isShowTimeListSuccess,
    } = useGetShowTimeListQuery([]);

    useEffect(() => {
        dispatch(loadShowTimeList(showtime?.data));
    }, [isShowTimeListSuccess]);


    const [activeTab, setActiveTab] = useState(1); // State để lưu trữ tab hiện tại đang được chọn

    // Hàm xử lý sự kiện khi tab được click
    const handleTabClick = (id) => {
        setActiveTab(id); // Cập nhật state khi tab được click
    };

    let selectedData = ""

    if(movieState) {
        selectedData = movieState.find(item => item?.id === activeTab);
    }

    const extractTime = (timeString) => {
        const [hour, minute] = timeString.split(':');
        return `${hour}:${minute}`;
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}`;
    };
    
    

  return (
    <div className='container'>
        <ul className="nav nav-tabs dayofweek mb-4">
            {movieState?.map((item, index) => (
                <li key={index} className={activeTab === item?.id ? 'activeTab' : ''}>
                    <NavLink to="" onClick={() => handleTabClick(item?.id)} className='text-black text-decoration-none'><span className='text-black fw-bold' style={{ fontSize: '38px'}}>{formatDate(item?.releaseDate)}</span></NavLink>
                </li>
            ))}
        </ul>
        {/* {activeTab === 0 && (
            <div>
            {movieState?.map((item, index) => (
                <div key={index} className="row">
                    <div className="col-lg-12 col-md-12 col-12 mb-3"  style={{ borderBottom: '1px solid #ccc' }}>
                        <div className='row mb-3'>
                            <div className="col-lg-3 col-md-4 col-12">
                                <img className='rounded-4' src={item?.movies?.image} alt="" />
                            </div>
                            <div className="col-lg-9 col-md-9 col-12 content">
                                <h2 className="fw-bold title"><NavLink className={cn('text-[#03599d]')} to="/schedule/123">{item?.movies.name}</NavLink></h2>
                                <div className="d-flex align-items-center mb-4">
                                    <span className='d-flex align-items-center fw-bold pr-4'><FaTag style={{ color: '#337ab7' }}/>{item?.movies.categories.join(', ')}</span>
                                    <span className='d-flex align-items-center fw-bold'><IoTime style={{ color: '#337ab7' }} /> {item?.movies.time} phút</span>
                                </div>
                                <span className="subtitle">{item?.language}</span>
                                <ul className="list-time mt-2">
                                    <li className="item-time">
                                        <NavLink to={`/ticket/${item.id}`} className='text-decoration-none text-black'>
                                            <span>
                                                {item?.showTime ? extractTime(item.showTime) : ''}
                                            </span>
                                        </NavLink>
                                        <span>{item?.rooms?.available_seats_count} ghế trống</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        )} */}
        {/* {movieState?.map((item) => (
            <div key={item.id}>
                {activeTab === item.id && ( 
                    <div>
                        <h2>Tab {item.id}</h2> 
                    </div>
                )}
            </div>
        ))} */}
        <div>
            {selectedData && ( 
                <div className="row">
                <div className="col-lg-12 col-md-12 col-12 mb-3"  style={{ borderBottom: '1px solid #ccc' }}>
                    <div className='row mb-3'>
                        <div className="col-lg-3 col-md-4 col-12">
                            <img className='rounded-4' src={selectedData?.movies?.image} alt="" />
                        </div>
                        <div className="col-lg-9 col-md-9 col-12 content">
                            <h2 className="fw-bold title"><NavLink className={cn('text-[#03599d]')} to="/schedule/123">{selectedData?.movies.name}</NavLink></h2>
                            <div className="d-flex align-items-center mb-4">
                                <span className='d-flex align-items-center fw-bold pr-4'><FaTag style={{ color: '#337ab7' }}/>{selectedData?.movies.categories.join(', ')}</span>
                                <span className='d-flex align-items-center fw-bold'><IoTime style={{ color: '#337ab7' }} /> {selectedData?.movies.time} phút</span>
                            </div>
                            <span className="subtitle">{selectedData?.language}</span>
                            <ul className="list-time mt-2">
                                <li className="item-time">
                                    <NavLink to={`/ticket/${selectedData.id}`} className='text-decoration-none text-black'>
                                        <span>
                                            {selectedData?.showTime ? extractTime(selectedData.showTime) : ''}
                                        </span>
                                    </NavLink>
                                    <span>{selectedData?.rooms?.quantity - selectedData?.rooms?.available_seats_count} ghế trống</span>
                                </li>
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
