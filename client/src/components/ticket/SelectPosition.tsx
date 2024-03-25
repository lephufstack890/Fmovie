import React, { useEffect, useState } from 'react'
import "./index.scss"
import { useParams } from "react-router-dom"
import { useGetShowTimeQuery } from "@/services/schedule/schedules.services"


const SelectPosition = ({ handleSeatClick, setQuantity, setTotalPriceProps, setSelectedSeatsId, setInfoShowtime }) => {
    const {id} = useParams()

    const {
        data: showtime,
        isLoading: isLoadingShowTime
    } = useGetShowTimeQuery( id! );

    

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // console.log(showtime)


    useEffect(() => {
        let totalPrice = 0;
        let calculatedTotalPrice = 0;
        let calculatedQuantity = 0;
        selectedSeats.forEach(seat => {
            const seatInfo = showtime?.data.rooms.seats.find(item => item.id === seat);
            if (seatInfo) {
                totalPrice += parseInt(seatInfo.price);
                calculatedTotalPrice += parseInt(seatInfo.price);
                calculatedQuantity += 1;
            }
        });
        setTotalPrice(totalPrice);
        setQuantity(calculatedQuantity);
        setTotalPriceProps(calculatedTotalPrice);
        setInfoShowtime(showtime?.data);
    }, [selectedSeats, showtime]);

    const toggleSeat = (seat) => {
        if (selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
        setSelectedSeatsId(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
        } else {
        setSelectedSeats([...selectedSeats, seat]);
        setSelectedSeatsId([...selectedSeats, seat]);
        }
    };

    // for (let i = 1; i <= showtime?.data.rooms.quantity; i++) {
    //     const seat = `J${i}`;
    //     const seatInfo = showtime?.data.rooms.seats.find(seat => seat.id === i);
    //     const isSelected = selectedSeats.includes(seat);
    //     const seatClass = `seat-cell seat-used seat-normal ${isSelected ? 'seat-select' : ''} ${seatInfo?.seatStatus === 'Đã đặt' ? 'seat-booked' : ''}`;
    //     seats.push(
    //         <div 
    //             // className={`seat-cell seat-used seat-normal ${isSelected ? 'seat-select' : ''}`}
    //             className={seatClass}
    //             key={i} 
    //             data-id={seatInfo?.id}
    //             data-seatStatus={seatInfo?.seatStatus}
    //             data-price={seatInfo?.price}
    //             onClick={() => {
    //                 if (seatInfo?.seatStatus !== 'Đã đặt') { 
    //                     toggleSeat(seat);
    //                     handleSeatClick(seat);
    //                 }
    //             }}
    //         >
    //         {seat}
    //         </div>
    //     );
    // }
    const renderSeats = () => {
        if (!showtime) return null;

        return showtime.data.rooms.seats.map((seatInfo) => {
            const isSelected = selectedSeats.includes(seatInfo.id);
            const seatClass = `seat-cell seat-used seat-normal ${isSelected ? 'seat-select' : ''} ${seatInfo.seatStatus === 'Đã đặt' ? 'seat-booked' : ''}`;

            return (
                <div 
                    className={seatClass}
                    key={seatInfo.id} 
                    data-id={seatInfo.id}
                    data-seatStatus={seatInfo.seatStatus}
                    data-price={seatInfo.price}
                    onClick={() => {
                        if (seatInfo.seatStatus !== 'Đã đặt') { 
                            toggleSeat(seatInfo.id);
                            // handleSeatClick(seatInfo.id);
                            handleSeatClick(seatInfo.id, seatInfo.nameRow);
                        }
                    }}
                >
                   {`${seatInfo?.nameRow}${seatInfo?.id}`}
                </div>
            );
        });
    };
  return (
    <>
     <div className="col-lg-8 col-md-8 col-12">
                <div className="blink py-2" style={{ textAlign: 'center', color: 'red', marginBottom: '10px', backgroundColor: 'rgb(243, 230, 192)' }}>
                    Theo quy định của cục điện ảnh, phim này không dành cho khán giả dưới 18  tuổi.
                </div>
                <div className="row note-seat-status">
                    <div className="col-lg-2 col-md-2 col-12">
                        <img width="35" height="35" src="https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-normal.png" />
                        <span className="note-seat-status-label">Ghế trống</span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-12">
                        <img width="35" height="35" src="https://www.betacinemas.vn/Assets/global/img/booking/seat-select-normal.png" />
                        <span className="note-seat-status-label">Ghế đang chọn</span>
                    </div>
                    <div className="col-lg-3 col-md-3 col-12">
                        <img width="35" height="35" src="https://www.betacinemas.vn/Assets/global/img/booking/seat-select-normal.png" />
                        <span className="note-seat-status-label">Ghế đang được giữ</span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-12">
                        <img width="35" height="35" src="https://www.betacinemas.vn/Assets/global/img/booking/seat-buy-normal.png" />
                        <span className="note-seat-status-label">Ghế đã bán</span>
                    </div>
                    {/* <div className="col-lg-2 col-md-2 col-12">
                        <img width="35" height="35" src="https://www.betacinemas.vn/Assets/global/img/booking/seat-set-normal.png" />
                        <span className="note-seat-status-label">Ghế đặt trước</span>
                    </div> */}
                </div>
                <div className='py-4'>
                    <div className="seat-diagram">
                        <img width="100%" height="100%" src="https://www.betacinemas.vn/Assets/global/img/booking/ic-screen.png" alt="" className="img-responsive" />
                    </div>
                    <div className="check-show">
                        <div className="full-width">
                            {renderSeats()}
                        </div>
                    </div>
                </div>
                <div className='row seat-type-panel'>
                    <div className="col-lg-2">
                        <img className="seat-type-image" style={{ width: '100%', maxWidth: '50px' }} src="https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-normal.png" />
                        <span>Ghế thường</span>
                    </div>
                    <div className="col-lg-2">
                        <img className="seat-type-image" style={{ width: '100%', maxWidth: '50px' }} src="https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-normal.png" />
                        <span>Ghế vip</span>
                    </div>
                    <div className="col-lg-2">
                        <img className="seat-type-image" style={{ width: '100%', maxWidth: '50px' }} src="https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-normal.png" />
                        <span>Ghế đôi</span>
                    </div>
                    <div className="col-lg-2" style={{ display: 'block' }}>
                        <div>
                            <span>Tổng tiền</span>
                        </div>
                        <div className='mt-4' style={{ color: '#03599d' }}>
                            <span>{totalPrice.toLocaleString()} VNĐ</span>
                        </div>                       
                    </div>
                    <div className="col-lg-3">
                        <span>Thời gian còn lại</span>
                    </div>
                </div>
            </div>
    </>
  )
}

export default SelectPosition