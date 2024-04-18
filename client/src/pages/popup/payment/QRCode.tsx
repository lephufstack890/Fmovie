const QRCode = ({setIsOpenPopup, linkVnpay}) => {
    const handleCloseQRCodeChange = async () => {
        setIsOpenPopup(false);
    }

    const handleNextPaymentChange = () => {
        // window.open(linkVnpay);
        window.location.href = linkVnpay;
        setIsOpenPopup(false);
    }
  
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
                    <div >
                        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px'}}>
                            <div style={{ width: '150px'}}>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS16ZAKAYuORQR_AzI-r5lCp-5KGX7f9ZIufqK5FSR0xQ&s"
                                    alt=""
                                    id=""
                                    className="img-fluid"
                                />
                            </div>                      
                        </div> */}

                        <div>
                        {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <div style={{ width: '100px'}}>
                                <img
                                    src="https://vinpearlphuquocresort.com/wp-content/uploads/2021/09/icon-thanh-cong-300x300.png"
                                    alt=""
                                    id=""
                                    className="img-fluid"
                                />
                            </div>
                        </div> */}
                        <div>
                            <p style={{ fontWeight: '700', fontSize: '20px', textAlign: 'center' }}>
                                Bạn có muốn tiếp tục thanh toán đơn hàng không?
                            </p>
                        </div>
                        {/* <div>
                            <div className="d-flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <p style={{ marginBottom: '0' }}>
                                    Mã đơn: <span style={{ fontWeight: '700', marginBottom: '0' }}>{orderNumber}</span>
                                </p>
                                <p style={{ margin: '0 5px' }}> - </p>
                                <p style={{ marginBottom: '0' }}>
                                    Tổng tiền: <span style={{ fontWeight: '700' }}>{totalPriceProps.toLocaleString()} VND</span>
                                </p>
                            </div>
                            <p style={{ textAlign: 'center' }}>
                                Kiểu thanh toán: Online
                            </p>
                        </div> */}
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
    )
}

export default QRCode;