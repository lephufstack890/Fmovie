import React, { useEffect, useState } from 'react'
import "./index.scss"
import { useParams } from "react-router-dom"
import { useGetTimeShowQuery } from "@/services/timeshow/timeshows.services"
import { TimeShow } from '@/services/timeshow/timeshows.interface'


const SelectPosition = ({ handleSeatClick, setQuantity, setTotalPriceProps, setSelectedSeatsId, setInfoShowtime }: any) => {
    const {id} = useParams()

    const {
        data: timeshow,
        isLoading: isLoadingTimeShow
    } = useGetTimeShowQuery( id! );

    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [seatNormal, setSeatNormal] = useState(0);
    const [seatVip, setSeatVip] = useState(0);
    const [seatDouble, setSeatDouble] = useState(0);

    useEffect(() => {
        let seatNormal = 0;
        let seatVip = 0;
        let seatDouble = 0;
        let totalPrice = 0;
        let calculatedTotalPrice = 0;
        let calculatedQuantity = 0;
        selectedSeats.forEach(seat => {
            const seatInfo = timeshow?.data[0].seats.find((item: TimeShow) => item.id === seat);
            if (seatInfo) {
                totalPrice += parseInt(seatInfo?.seatType.price);
                calculatedTotalPrice += parseInt(seatInfo?.seatType.price);
                calculatedQuantity += 1;
            }
            if(seatInfo?.nameRow === 'T'){
                seatNormal += 1;
            }
            if(seatInfo?.nameRow === 'V'){
                seatVip += 1;
            }
            if(seatInfo?.nameRow === 'D'){
                seatDouble += 1;
            }
        });
        setSeatNormal(seatNormal)
        setSeatVip(seatVip)
        setSeatDouble(seatDouble)
        setTotalPrice(totalPrice);
        setQuantity(calculatedQuantity);
        setTotalPriceProps(calculatedTotalPrice);
        setInfoShowtime(timeshow?.data);
    }, [selectedSeats, timeshow]);

    const toggleSeat = (seat: never) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
            setSelectedSeatsId(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
            setSelectedSeatsId([...selectedSeats, seat]);
        }
    };

    const renderSeats = () => {
        if (!timeshow) return null;
        return timeshow?.data[0].seats.map((seatInfo: any) => {
            const isSelected = selectedSeats.includes(seatInfo?.id);
            // const seatClass = `seat-cell seat-empty  seat-used seat-normal ${isSelected ? 'seat-select' : ''} ${seatInfo?.seatStatus === 'Đã bán' ? 'seat-booked' : ''}`;
            let seatClass = "seat-cell seat-empty  seat-used";
            switch (seatInfo?.nameRow) {
                case "T":
                    seatClass += " seat-normal";
                    break;
                case "V":
                    seatClass += " seat-vip";
                    break;
                case "D":
                    seatClass += " seat-double";
                    break;
                default:
                    seatClass += " seat-normal"; 
                    break;
            }
            seatClass += isSelected && seatInfo?.nameRow === "T" ? " seat-select-normal" : "";
            seatClass += isSelected && seatInfo?.nameRow === "V" ? " seat-select-vip" : "";
            seatClass += isSelected && seatInfo?.nameRow === "D" ? " seat-select-double" : "";
            seatClass += seatInfo?.seatStatus === 'Đã bán' ? " seat-booked" : "";

            return (
                <div 
                    className={seatClass}
                    key={seatInfo?.id} 
                    data-id={seatInfo?.id}
                    data-seatStatus={seatInfo?.seatStatus}
                    data-price={seatInfo?.seatType.price}
                    onClick={() => {
                        if (seatInfo?.seatStatus !== 'Đã bán') { 
                            toggleSeat(seatInfo?.id);
                            // handleSeatClick(seatInfo.id);
                            handleSeatClick(seatInfo?.id, seatInfo?.nameRow);
                        }
                    }}
                >
                   <span>{`${seatInfo?.nameRow}${seatInfo?.id}`}</span>
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
                    {/* <div className="col-lg-2 col-md-2 col-12">
                        <img width="35" height="35" src="https://www.betacinemas.vn/Assets/global/img/booking/seat-select-normal.png" />
                        <span className="note-seat-status-label">Ghế đang chọn</span>
                    </div> */}
                    <div className="col-lg-3 col-md-3 col-12">
                        <img width="35" height="35" src="https://betacinemas.vn/Assets/global/img/booking/seat-process-normal.png" />
                        <span className="note-seat-status-label">Ghế đang được giữ</span>
                    </div>
                    <div className="col-lg-2 col-md-2 col-12">
                        <img width="35" height="35" src="https://www.betacinemas.vn/Assets/global/img/booking/seat-buy-normal.png" />
                        <span className="note-seat-status-label">Ghế đã bán</span>
                    </div>
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
                <div className='row seat-type-panel' style={{ justifyContent: 'space-between' }}>
                    <div className="col-lg-2">
                        <img className="seat-type-image" style={{ width: '100%', maxWidth: '50px' }} src="https://www.betacinemas.vn/Assets/global/img/booking/seat-unselect-normal.png" />
                        <div>
                            <span>Ghế thường</span>
                        </div>
                        {seatNormal !== 0 && (
                            <div className='' style={{ color: '#03599d' }}>
                                <span>{seatNormal} x 70,000 VNĐ</span>
                            </div>
                        )}
                    </div>
                    <div className="col-lg-2">
                        <img className="seat-type-image" style={{ width: '100%', maxWidth: '50px' }} src="https://betacinemas.vn/Assets/global/img/booking/seat-unselect-vip.png" />
                        <div>
                            <span>Ghế vip</span>
                        </div>
                        {seatVip !== 0 && (
                            <div className='' style={{ color: '#03599d' }}>
                                <span>{seatVip} x 90,000 VNĐ</span>
                            </div>
                        )}
                    </div>
                    <div className="col-lg-2">
                        <img className="seat-type-image" style={{ width: '100%', maxWidth: '50px' }} src="https://betacinemas.vn/Assets/global/img/booking/seat-unselect-double.png" />
                        <div>
                            <span>Ghế đôi</span>
                        </div>
                        {seatDouble !== 0 && (
                            <div className='mt-4' style={{ color: '#03599d' }}>
                                <span>{seatDouble} x 150,000 VNĐ</span>
                            </div>
                        )} 
                    </div>
                    <div className="col-lg-2" style={{ display: 'block' }}>
                        <div>
                            <span>Tổng tiền</span>
                        </div>
                        <div className='mt-5' style={{ color: '#03599d' }}>
                            <span>{totalPrice.toLocaleString()} VNĐ</span>
                        </div>                       
                    </div>
                </div>
            </div>
    </>
  )
}

export default SelectPosition