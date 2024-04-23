// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { User } from '@/services/auth/auth.interface';
// import { useSelector } from 'react-redux';
// import { usePaymentMutation } from "@/services/payment/payments.services"
// import { toastError } from "@/hook/Toast"
// import QRCode from '@/pages/popup/payment/QRCode';

// const Payment = ({ quantity, totalPriceProps, selectedSeats, handlerPrevious, showtime, timeshow }: any) => {

//     const location = useLocation();
//     const { pathname, search } = location;
//     const currentURL = "http://localhost:5173" + `${pathname}${search}`;
//     const user = useSelector((state: any) => state.auth.user) as User;

    
//     const [selectedInput, setSelectedInput] = useState("Chuyển khoản");
//     const [orderNumber, setOrderNumber] = useState("");
//     const [timeCurrent, setTimeCurrent] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [isOpenPopup, setIsOpenPopup] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(360); 
//     const [selectedBank, setSelectedBank] = useState(null);
//     const [linkVnpay, setLinkVnpay] = useState("");

//     const [paymentMutation, {isLoadingPayment}] = usePaymentMutation()

//     const handleInputChange = (inputId: any): void => {
//         setSelectedInput(inputId === selectedInput ? null : inputId);
//     };

//     const handlePopupClick = (responseData: any) => {
//         setIsOpenPopup(true);
//         setLinkVnpay(responseData)
//     }

//     const handleBankImageClick = (bankId: any) => {
//         setSelectedBank(bankId); 
//     }

//     useEffect(() => {
//         generateOrderNumber();
//     }, []);

//     const generateOrderNumber = () => {
//         const randomDigits = Math.floor(100000 + Math.random() * 900000);
//         const currentDate = new Date();
//         const day = currentDate.getDate();
//         const month = currentDate.getMonth() + 1; 
//         const year = currentDate.getFullYear();
//         setTimeCurrent(`${day}/${month}/${year}`);
//         const order = `TN-${randomDigits}${day}${month}${year}`;
//         setOrderNumber(order);
//     };

//     useEffect(() => {
//         if (timeLeft === 0) {
//             handlerPrevious();
//         }
//     }, [timeLeft]);
    
//     useEffect(() => {
//         const countdownTimer = setInterval(() => {
//             setTimeLeft(prevTime => {
//                 if (prevTime === 0) {
//                     clearInterval(countdownTimer);
//                     return 0;
//                 } else {
//                     return prevTime - 1;
//                 }
//             });
//         }, 1000);
    
//         return () => clearInterval(countdownTimer);
//     }, []);

//     const formatTime = (time:any) => {
//         const minutes = Math.floor(time / 60);
//         const seconds = time % 60;
//         return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//     };
    

//     const handleSubmit = async () => {
//         if(selectedBank === null){
//             toastError('Bạn chưa chọn ngân hàng')
//         }else{
//             setIsLoading(true);
//             const payment = {
//                 "order_code": orderNumber,
//                 "totalPayment": totalPriceProps.toString(),
//                 "namebank": selectedBank,
//                 "redirect": currentURL,
//                 "email": user?.email,
//             }
//             const formData = {
//                 totalQuantity: quantity, 
//                 seats: selectedSeats,  
//                 showtime: showtime,
//                 timeshow: timeshow
//             }
//             try { 
//                 await paymentMutation(payment).unwrap()
//                 .then(response => {
//                     const responseData = response?.link.data; 
//                     handlePopupClick(responseData);
//                     localStorage.setItem('paymentInfo', JSON.stringify(formData));
//                 });
//             } 
//             catch (error:unknown) {
//                 toastError('Thanh toán thất bại!')
//             } finally {
//                 setIsLoading(false); 
//             }
//         }
        
//     }

//     return(
//     <>
//     <div className="container mt-5">
//         <div className="row">
//             <div className="col-8">
//                 <h6 className="bg-gray-100 p-3">Chọn ngân hàng thanh toán</h6>
//                 <div className="border p-2 mt-2 rounded">
//                     <div className="form-check">
//                         <input 
//                             className="form-check-input" 
//                             type="radio" 
//                             name="paymentMethod" 
//                             // value="Chuyển khoản"
//                             id="Chuyển khoản" 
//                             onChange={() => handleInputChange("Chuyển khoản")}
//                             checked={selectedInput === "Chuyển khoản"}
//                         />
//                         <label className="form-check-label" htmlFor="Chuyển khoản">   
//                             Thẻ ATM / Tài khoản ngân hàng
//                             <i className="fas fa-credit-card me-2 ml-2"></i>
//                             {/* Thanh toán online */}
//                         </label>
//                     </div>

//                     {selectedInput === "Chuyển khoản" && (
//                     <div>
//                         <div className="d-flex mt-3 mb-3">
//                             <img style={{ border: (selectedBank === "VietcomBank" ? "2px solid rgb(220 51 51)" : "1px solid #ccc") , borderRadius: "5px", width: "100px", height: "50px", padding: "5px" }}
//                                 src="data:image/jpeg;base64,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"
//                                 alt="VCB"
//                                 id="VietcomBank"
//                                 className="img-fluid"
//                                 onClick={() => handleBankImageClick("VietcomBank")} 
//                             />
//                             <img style={{ border: (selectedBank === "NCB" ? "2px solid rgb(220 51 51)" : "1px solid #ccc"), borderRadius: "5px", width: "100px", height: "50px", padding: "5px", marginLeft: "8px" }}
//                                 src="data:image/jpeg;base64,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"
//                                 alt="NCB"
//                                 id="NCB"
//                                 className="img-fluid"
//                                 onClick={() => handleBankImageClick("NCB")} 
//                             />
//                             <img style={{ border: (selectedBank === "EXIMBANK" ? "2px solid rgb(220 51 51)" : "1px solid #ccc"), borderRadius: "5px", width: "100px", height: "50px", padding: "5px", marginLeft: "8px" }}
//                                 src="data:image/png;base64,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"
//                                 alt="EXIMBANK"
//                                 id="EXIMBANK"
//                                 className="img-fluid"
//                                 onClick={() => handleBankImageClick("EXIMBANK")} 
//                             />
//                         </div>
//                     </div>
//                     )}
//                 </div>   
//                 <div style={{ display: 'flex', justifyContent: 'end', marginTop: '15px' }}>
//                     <p className='mr-2 mb-0 pt-1'>Thời gian còn lại:</p>
//                     <div style={{ background: '#ccc', padding: '6px 18px', borderRadius: '6px' }}>
//                         <p className='mb-0'>{formatTime(timeLeft)}</p>
//                     </div>  
//                 </div>
//             </div>
//             <div className="col-4">
//                 <h6 className="bg-gray-100 p-3">Thông tin đơn hàng</h6>
//                 <div className="border p-3 rounded">
//                     <p className="mb-2">Đơn vị chấp nhận thanh toán</p>
//                     <p className="mb-2"><strong>Beta Cinemas</strong></p>
//                     <p className="mb-2">Mã đơn hàng</p>
//                     <p className="mb-2"><strong>{orderNumber}</strong></p>
//                     <hr />
//                     <div className="d-flex justify-content-between align-items-center mb-2">
//                         <p className="m-0">Số tiền thanh toán</p>
//                         <h4 className="m-0 text-primary">{totalPriceProps.toLocaleString()} VND</h4>
//                     </div>
//                 </div>
//                 <div className="mt-3">
//                     <button onClick={handleSubmit} className='btn btn-primary w-full'>
//                         {isLoading ? (
//                             <i className="fa fa-spinner fa-spin"></i>
//                         ) : (
//                             "Thanh toán"
//                         )}
//                     </button>
//                 </div>
//                 {isOpenPopup && <QRCode 
//                     setIsOpenPopup={setIsOpenPopup} 
//                     linkVnpay={linkVnpay}
//                 />}
//             </div>
//         </div>
//     </div>
// </>
// )
// }

// export default Payment