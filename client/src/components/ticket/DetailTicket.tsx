import { FaTag } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
import { MdOutlineHomeWork } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { MdOutlineBedroomParent } from "react-icons/md";
import { GiRockingChair } from "react-icons/gi";
import { useGetShowTimeQuery } from "@/services/schedule/schedules.services"
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';


const DetailTicket = ({ timeshow, idMovie, selectedSeats, handlerNext }) => {

    const [isSeatsSelected, setIsSeatsSelected] = useState(false);

    useEffect(() => {
        if (selectedSeats && selectedSeats.length > 0) {
            setIsSeatsSelected(true); 
        } else {
            setIsSeatsSelected(false); 
        }
    }, [selectedSeats]); 

    const {
        data: showtime,
    } = useGetShowTimeQuery( idMovie! );

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };
    
  return (
    <>
     <div className="dat-ve-sidebar col-lg-4 col-md-4 col-12 ">
                <div className="row pb-2">
                    <img className='col-lg-6 p-0 w-80' 
                    src={showtime?.data?.movies?.image} alt="" />
                    <div className="box-content-top col-lg-6">
                        <h2 className="title" style={{ fontSize: '25px' }}>{showtime?.data?.movies?.name}</h2>
                        <span>2D Phụ đề</span>
                    </div>
                </div>
                <div className="action-type row border-dashed">
                    <div className="col-lg-12">
                        <div className="row pb-2">
                            <span className='d-flex align-items-center col-lg-6'><FaTag /> Thể loại</span>
                            <span className='col-lg-6'>{showtime?.data?.movies.categories.join(', ')}</span>
                        </div>
                        <div className="row pb-2">
                            <span className='d-flex align-items-center col-lg-6'><IoTime /> Thời gian</span>
                            <span className='col-lg-6'>{showtime?.data?.movies.time} phút</span>
                        </div>
                    </div>
                </div>
                <div className="action-type row">
                    <div className="col-lg-12">
                        <div className="row pb-2">
                            <span className='d-flex align-items-center col-lg-6'><MdOutlineHomeWork /> Rạp chiếu</span>
                            <span className='col-lg-6'>{showtime?.data?.cinema?.name}</span>
                        </div>
                        <div className="row pb-2">
                            <span className='d-flex align-items-center col-lg-6'><GrSchedules /> Ngày chiếu</span>
                            <span className='col-lg-6'>{showtime?.data?.movies.releaseDate ? formatDate(showtime?.data?.movies.releaseDate) : ''}</span>
                        </div>
                        <div className="row pb-2">
                            <span className='d-flex align-items-center col-lg-6'><IoTime /> Giờ chiếu</span>
                            <span className='col-lg-6'>{timeshow?.data[0].name}</span>
                        </div>
                        <div className="row pb-2">
                            <span className='d-flex align-items-center col-lg-6'><MdOutlineBedroomParent /> Phòng chiếu</span>
                            <span className='col-lg-6'>{timeshow?.data[0].room.name}</span>
                        </div>
                        <div className="row pb-2">
                            <span className='d-flex align-items-center col-lg-6'><GiRockingChair /> Ghế ngồi</span>
                            <span className="col-lg-6">{selectedSeats.map((seat: number) => `${seat}`).join(', ')}</span>
                        </div>
                    </div>
                </div>
                <div className='text-center'>
                    <NavLink to={{ pathname: '/payment'}}>
                        <button
                            onClick={handlerNext}
                            className='mb-4'
                            disabled={!isSeatsSelected}
                            style={{ backgroundColor: isSeatsSelected ? '#007bff' : '#76accf', cursor: isSeatsSelected ? 'pointer' : 'not-allowed' }}
                        >
                            Tiếp tục
                        </button>
                    </NavLink>
                </div>
            </div>
    </>
  )
}

export default DetailTicket