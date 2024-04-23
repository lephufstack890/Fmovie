// const QRCode = ({setIsOpenPopup, linkVnpay}) => {
//     const handleCloseQRCodeChange = async () => {
//         setIsOpenPopup(false);
//     }

//     const handleNextPaymentChange = () => {
//         window.location.href = linkVnpay?.link?.data;
//         setIsOpenPopup(false);
//     }
  
//     return (
//         <>
//         <div
//         style={{
//             position: 'fixed',
//             background: 'rgba(0,0,0,0.6)',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             zIndex: 9999,
//           }}
//         >
//             <div
//             style={{
//                 position: 'absolute',
//                 top: '180px',
//                 left: '470px',
//                 background: 'white',
//                 borderRadius: '6px',
//                 width: '570px',
//                 height: '180px',
//                 padding: '20px 10px'
//             }} 
//             >
//                 <div className="p-3" style={{ fontSize: '12px' }}>
//                     <div >

//                         <div>
//                         <div>
//                             <p style={{ fontWeight: '700', fontSize: '20px', textAlign: 'center' }}>
//                                 Bạn có muốn tiếp tục thanh toán đơn hàng không?
//                             </p>
//                         </div>
//                         </div>
                        
//                     </div>
                        
//                     <div style={{ textAlign: 'center', marginTop: '30px', marginLeft: '10px' }}>
//                         <button onClick={handleCloseQRCodeChange} className="btn btn-primary" style={{ padding: '8px 35px', background: '#ccc', border: 'none', marginRight: '20px' }}>Hủy</button>
//                         <button onClick={handleNextPaymentChange} className="btn btn-primary" style={{ padding: '8px 35px', background: 'rgb(19 80 172)' }}>Tiếp tục</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }

// export default QRCode;


import React from 'react';

interface QRCodeProps {
    setIsOpenPopup: (isOpen: boolean) => void;
    linkVnpay: unknown;
}


const QRCode: React.FC<QRCodeProps> = ({ setIsOpenPopup, linkVnpay }) => {
    const handleCloseQRCodeChange = async () => {
        setIsOpenPopup(false);
    };

    const handleNextPaymentChange = () => {
        window.location.href = linkVnpay?.link?.data;
        setIsOpenPopup(false);
    };

    return (
        <>
            <div
                style={{
                    position: 'fixed',
                    background: 'rgba(0,0,0,0.6)',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9999,
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '180px',
                        left: '470px',
                        background: 'white',
                        borderRadius: '6px',
                        width: '570px',
                        height: '180px',
                        padding: '20px 10px'
                    }}
                >
                    <div className="p-3" style={{ fontSize: '12px' }}>
                        <div>
                            <div>
                                <p style={{ fontWeight: '700', fontSize: '20px', textAlign: 'center' }}>
                                    Bạn có muốn tiếp tục thanh toán đơn hàng không?
                                </p>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '30px', marginLeft: '10px' }}>
                            <button onClick={handleCloseQRCodeChange} className="btn btn-primary" style={{ padding: '8px 35px', background: '#ccc', border: 'none', marginRight: '20px' }}>Hủy</button>
                            <button onClick={handleNextPaymentChange} className="btn btn-primary" style={{ padding: '8px 35px', background: 'rgb(19 80 172)' }}>Tiếp tục</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QRCode;


