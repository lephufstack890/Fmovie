import React, { useState } from 'react';
import { toastError } from "@/hook/Toast"
import './TicketPage.scss';
import { IoIosArrowForward } from "react-icons/io";
import SelectPosition from '../../components/ticket/SelectPosition';
import DetailTicket from '../../components/ticket/DetailTicket';
// import InfoPayment from '../../components/ticket/InfoPayment';
import Payment from '../../components/ticket/Payment';
// import { useSelector } from 'react-redux';
// import { User } from '@/services/auth/auth.interface';
import { useParams } from "react-router-dom"
import { useGetTimeShowQuery } from "@/services/timeshow/timeshows.services"
import { useGetShowTimeQuery } from "@/services/schedule/schedules.services"

const TicketPage: React.FC = () => {
    const idMovie = localStorage.getItem('hiddenInfo');

    const {id} = useParams()
    const [totalPriceProps, setTotalPriceProps] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [selectedSeatsId, setSelectedSeatsId] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [infoShowtime, setInfoShowtime] = useState({});

    const {
        data: timeshow,
        isLoading: isLoadingTimeShow
    } = useGetTimeShowQuery( id! );

    // console.log(timeshow)

    const {
        data: showtime,
        isLoading: isLoadingShowTime
    } = useGetShowTimeQuery( idMovie! );
    
    const handleSeatClick = (seatId: string, rowName: string) => {
        const seatString = rowName + seatId;
        setSelectedSeats((prevSelectedSeatsId: string) =>
            prevSelectedSeatsId.includes(seatString) 
                ? prevSelectedSeatsId.filter((seat: string) => seat !== seatString) 
                : [...prevSelectedSeatsId, seatString]  
        );
    };
    
    const [currentPage, setCurrentPage] = useState('selectPosition');
    const [showDetailTicket, setShowDetailTicket] = useState(true);

     
    const nextPage = () => {
        if(selectedSeatsId.length == 0){
            toastError('Bạn chưa chọn ghế')
        }else{
            setCurrentPage('payment');
            setShowDetailTicket(false); 
        }
        
    };

    const previousPage = () => {
        setCurrentPage('selectPosition');
        setShowDetailTicket(true); 
        setSelectedSeatsId([]);
        setSelectedSeats([]);
    }

  return (
    <div className='container'>
        <div className="d-flex align-items-center py-2 breadcrumb">
            <span>Trang chủ</span><IoIosArrowForward /><span>Đặt vé</span><IoIosArrowForward /><span>{showtime?.data.movies.name}</span>
        </div>

        <div className="row pb-4">
            {currentPage === 'selectPosition' && <SelectPosition 
                                                    handleSeatClick={handleSeatClick} 
                                                    setQuantity={setQuantity}
                                                    setTotalPriceProps={setTotalPriceProps}
                                                    setSelectedSeatsId={setSelectedSeatsId}
                                                    setInfoShowtime={setInfoShowtime}
                                                />}
            {currentPage === 'payment' && <Payment quantity={quantity}
                                                   totalPriceProps={totalPriceProps}
                                                   selectedSeatsId={selectedSeatsId}
                                                   selectedSeats={selectedSeats}
                                                   infoShowtime={infoShowtime}
                                                   handlerPrevious={previousPage}
                                                />}
            {showDetailTicket && <DetailTicket timeshow={timeshow} idMovie={idMovie} selectedSeats={selectedSeats} handlerNext={nextPage} />}
        </div>
    </div>
  );
};

export default TicketPage;
