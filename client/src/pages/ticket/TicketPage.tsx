import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toastError } from "@/hook/Toast"
import './TicketPage.scss';
import { IoIosArrowForward } from "react-icons/io";
import SelectPosition from '../../components/ticket/SelectPosition';
import DetailTicket from '../../components/ticket/DetailTicket';
import Payment from '../payment/Payment';
import { User } from '@/services/auth/auth.interface';
import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux';
import { useGetTimeShowQuery } from "@/services/timeshow/timeshows.services"
import { useGetShowTimeQuery } from "@/services/schedule/schedules.services"
import { useChooseSeatMutation } from "@/services/seats/seats.services"

const TicketPage = () => {
    const idMovie = localStorage.getItem('hiddenInfo');

    const {id} = useParams()
    const location = useLocation();

    const { pathname, search } = location;
    const currentURL = "http://localhost:5173" + `${pathname}${search}`;

    const user = useSelector((state: any) => state.auth.user) as User;

    const [totalPriceProps, setTotalPriceProps] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [selectedSeatsId, setSelectedSeatsId] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [chooseSeat, ] = useChooseSeatMutation();

    const {
        data: timeshow,
    } = useGetTimeShowQuery( id! );

    const {
        data: showtime,
    } = useGetShowTimeQuery( idMovie! );

    const handleSeatClick = (seatId: any, rowName: any) => {
        const seatString = rowName + seatId;
        setSelectedSeats((prevSelectedSeatsId: any) =>
            prevSelectedSeatsId.includes(seatString) 
                ? prevSelectedSeatsId.filter((seat: any) => seat !== seatString) 
                : [...prevSelectedSeatsId, seatString]  
        );
    };
    
    const [currentPage, setCurrentPage] = useState('selectPosition');
    const [showDetailTicket, setShowDetailTicket] = useState(true);

     
    const nextPage = async () => {
        if(selectedSeatsId.length == 0){
            toastError('Bạn chưa chọn ghế')
        }else{
            const seats = selectedSeats.map((str: any) => parseInt(str.replace(/[^\d]/g, ''), 10));
            await chooseSeat({
                id_user: user?.id,
                id_seat: seats,
                status: "Đang giữ"
            });
            setCurrentPage('payment');
            setShowDetailTicket(false); 
            const formData = {
                quantity: quantity,
                totalPriceProps: totalPriceProps,
                showtime: showtime,
                timeshow: timeshow,
                selectedSeats: selectedSeats,
                currentURL: currentURL
            }
            localStorage.setItem('payment', JSON.stringify(formData));
        }
        
    };

  return (
    <div className='container'>
        <div className="d-flex align-items-center py-2 breadcrumb">
            <span>Trang chủ</span><IoIosArrowForward /><span>Đặt vé</span><IoIosArrowForward /><span>{showtime?.data?.movies?.name}</span>
        </div>

        <div className="row pb-4">
            {currentPage === 'selectPosition' && <SelectPosition 
                                                    handleSeatClick={handleSeatClick} 
                                                    setQuantity={setQuantity}
                                                    setTotalPriceProps={setTotalPriceProps}
                                                    setSelectedSeatsId={setSelectedSeatsId}
                                                />}
            {currentPage === 'payment' && <Payment />}
            {showDetailTicket && <DetailTicket 
                                        timeshow={timeshow} 
                                        idMovie={idMovie} 
                                        selectedSeats={selectedSeats} 
                                        handlerNext={nextPage} 
                                />}
        </div>
    </div>
  );
};

export default TicketPage;
