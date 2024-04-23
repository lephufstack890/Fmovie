// import { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { toastError } from "@/hook/Toast"
// import './TicketPage.scss';
// import { IoIosArrowForward } from "react-icons/io";
// import SelectPosition from '../../components/ticket/SelectPosition';
// import DetailTicket from '../../components/ticket/DetailTicket';
// import Payment from '../payment/Payment';
// import { User } from '@/services/auth/auth.interface';
// import { useParams } from "react-router-dom"
// import { useSelector } from 'react-redux';
// import { useGetTimeShowQuery } from "@/services/timeshow/timeshows.services"
// import { useGetShowTimeQuery } from "@/services/schedule/schedules.services"
// import { useChooseSeatMutation } from "@/services/seats/seats.services"
// import { useGetMoviesQuery } from "@/services/movies/movies.services";

// const TicketPage = () => {

//     const {id} = useParams()
//     const location = useLocation();
//     const searchParams = new URLSearchParams(location.search);
//     const id_movie = searchParams.get('id_movie');

//     const { pathname, search } = location;
//     const currentURL = "http://localhost:5173" + `${pathname}${search}`;

//     const user = useSelector((state: any) => state.auth.user) as User;

//     //const user = useSelector((state: { auth: { user: User } }) => state.auth.user);

//     const [totalPriceProps, setTotalPriceProps] = useState(0);
//     const [quantity, setQuantity] = useState(0);
//     const [selectedSeatsId, setSelectedSeatsId] = useState([]);
//     const [selectedSeats, setSelectedSeats] = useState([]);

//     const [chooseSeat, ] = useChooseSeatMutation();

//     const {
//         data: timeshow,
//     } = useGetTimeShowQuery( id! );

//     const {
//         data: showtime,
//     } = useGetShowTimeQuery( id_movie! );

//     const {
//         data: movie,
//     } = useGetMoviesQuery( id_movie! );

//     console.log(movie)

//     const handleSeatClick = (seatId: any, rowName: any) => {
//         const seatString = rowName + seatId;
//         setSelectedSeats((prevSelectedSeatsId: any) =>
//             prevSelectedSeatsId.includes(seatString) 
//                 ? prevSelectedSeatsId.filter((seat: any) => seat !== seatString) 
//                 : [...prevSelectedSeatsId, seatString]  
//         );
//     };
    
//     const [currentPage, setCurrentPage] = useState('selectPosition');
//     const [showDetailTicket, setShowDetailTicket] = useState(true);

     
//     const nextPage = async () => {
//         if(selectedSeatsId.length == 0){
//             toastError('Bạn chưa chọn ghế')
//         }

//         const seats = selectedSeats.map((str: string) => parseInt(str.replace(/[^\d]/g, ''), 10));
//             await chooseSeat({
//                 id_user: user?.id,
//                 id_seat: seats,
//                 status: "Đang giữ"
//             });
//             setCurrentPage('payment');
//             setShowDetailTicket(false); 
//             const formData = {
//                 quantity: quantity,
//                 totalPriceProps: totalPriceProps,
//                 showtime: showtime,
//                 timeshow: timeshow,
//                 selectedSeats: selectedSeats,
//                 currentURL: currentURL
//             }
//             localStorage.setItem('payment', JSON.stringify(formData));
        
//     };

//   return (
//     <div className='container'>
//         <div className="d-flex align-items-center py-2 breadcrumb">
//             <span>Trang chủ</span><IoIosArrowForward /><span>Đặt vé</span><IoIosArrowForward /><span>{movie?.data?.name}</span>
//         </div>

//         <div className="row pb-4">
//             {currentPage === 'selectPosition' && <SelectPosition 
//                                                     handleSeatClick={handleSeatClick} 
//                                                     setQuantity={setQuantity}
//                                                     setTotalPriceProps={setTotalPriceProps}
//                                                     setSelectedSeatsId={setSelectedSeatsId}
//                                                 />}
//             {currentPage === 'payment' && <Payment />}
//             {showDetailTicket && <DetailTicket 
//                                         timeshow={timeshow} 
//                                         id_movie={id_movie} 
//                                         selectedSeats={selectedSeats} 
//                                         handlerNext={nextPage} 
//                                 />}
//         </div>
//     </div>
//   );
// };

// export default TicketPage;


import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toastError } from "@/hook/Toast";
import './TicketPage.scss';
import { IoIosArrowForward } from "react-icons/io";
import SelectPosition from '../../components/ticket/SelectPosition';
import DetailTicket from '../../components/ticket/DetailTicket';
import Payment from '../payment/Payment';
import { User } from '@/services/auth/auth.interface';
import { useGetTimeShowQuery } from "@/services/timeshow/timeshows.services";
import { useGetShowTimeQuery } from "@/services/schedule/schedules.services";
import { useChooseSeatMutation } from "@/services/seats/seats.services";
import { useGetMoviesQuery } from "@/services/movies/movies.services";

const TicketPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id_movie = searchParams.get('id_movie');

    const { pathname, search } = location;
    const currentURL = `http://localhost:5173${pathname}${search}`;

    const user = useSelector((state: { auth: { user: User } }) => state.auth.user);

    const [totalPriceProps, setTotalPriceProps] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [selectedSeatsId, setSelectedSeatsId] = useState<string[]>([]);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const [chooseSeat] = useChooseSeatMutation();

    const { data: timeshow } = useGetTimeShowQuery(id!);
    const { data: showtime } = useGetShowTimeQuery(id_movie!);
    const { data: movie } = useGetMoviesQuery(id_movie!);

    console.log(movie);

    const handleSeatClick = (seatId: string, rowName: string) => {
        const seatString = `${rowName}${seatId}`;
        setSelectedSeats((prevSelectedSeatsId: string[]) =>
            prevSelectedSeatsId.includes(seatString)
                ? prevSelectedSeatsId.filter((seat: string) => seat !== seatString)
                : [...prevSelectedSeatsId, seatString]
        );
    };

    const [currentPage, setCurrentPage] = useState<string>('selectPosition');
    const [showDetailTicket, setShowDetailTicket] = useState<boolean>(true);

    const nextPage = async () => {
        if (selectedSeatsId.length === 0) {
            toastError('Bạn chưa chọn ghế');
        }

        const seats = selectedSeats.map((str: string) => parseInt(str.replace(/[^\d]/g, ''), 10));
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
    };

    return (
        <div className='container'>
            <div className="d-flex align-items-center py-2 breadcrumb">
                <span>Trang chủ</span><IoIosArrowForward /><span>Đặt vé</span><IoIosArrowForward /><span>{movie?.data?.name}</span>
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
                    id_movie={id_movie}
                    selectedSeats={selectedSeats}
                    handlerNext={nextPage}
                />}
            </div>
        </div>
    );
};

export default TicketPage;



