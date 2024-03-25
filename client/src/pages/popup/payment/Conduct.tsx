
const Conduct = ({setIsOpenPopupConduct}) => {

    const handleCloseConductChange = () => {
        setIsOpenPopupConduct(false);
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
            <div style={{ backgroundColor: 'white', position: 'absolute', top: '165px', right: '170px', borderRadius: '50%', width: '26px'}}>
                <i className="fas fa-times" style={{ paddingLeft: '7px' }} onClick={handleCloseConductChange}></i>
            </div>
            <div
            style={{
                position: 'absolute',
                top: '200px',
                left: '210px',
                background: 'white',
                borderRadius: '6px',
                width: '1140px',
                height: '300px',
                padding: '20px 10px'
            }} 
            >
                <div className="" style={{paddingBottom: '10px', borderBottom: '1px solid #ddd', textAlign: 'center', fontWeight: '700'}}>
                   Hướng dẫn thanh toán qua Vietcombank
                </div>
                <div className="d-flex justify-content-between p-3" style={{ fontSize: '12px' }}>
                    <div style={{ width: '360px' }}>
                        <div>
                            <p className="mb-0" style={{ fontWeight: '700' }}>Số thẻ</p>
                            <p className="mb-0">Dãy 16 hoặc 19 số in trên mặt trước của thẻ, 4 số đầu của thẻ là 9704.</p>
                            <p>Ví dụ: 9704 1234 5678 9123 012</p>
                        </div>
                        <div>
                            <p className="mb-0" style={{ fontWeight: '700' }}>Tháng/Năm phát hành</p>
                            <p className="mb-0">Tháng và Năm phát hành của thẻ, in trên mặt trước của thẻ (VALID FROM) (nếu có.)</p>
                            <p>Ví dụ: 05/17</p>
                        </div>
                        <div>
                            <p className="mb-0" style={{ fontWeight: '700' }}>Tên chủ thẻ</p>
                            <p className="mb-0">Tên chủ thẻ in trên mặt trước của thẻ, viết cách và không có dấu Tiếng Việt.</p>
                            <p>Ví dụ: NGUYEN VAN A</p>
                        </div>
                    </div>

                    <div style={{ width: '360px', paddingLeft: '20px' }}>
                        <img src="https://onepay.vn/paygate/assets/img/dialog/47_dialog_card_vi.png" alt="" />
                    </div>

                    <div style={{ width: '360px' }}>
                        <div>
                            <div>
                                <p className="mb-0" style={{ fontWeight: '700' }}>Điều kiện thành toán trực tuyến</p>
                            </div>
                            
                            <div>
                                <p className="mb-0">Đăng ký dịch vụ <span style={{ fontWeight: '700' }}>VCB Digibank</span> và <span style={{ fontWeight: '700' }}>số điện thoại nhận SMS-OTP</span> 
                                cho thẻ ghi nợ nội địa Vietcombank bằng một trong các cách sau:
                                </p>
                            </div>
                            
                            <div>
                            <p className="mb-0"><span style={{ fontWeight: '700' }}>Cách 1:</span> Truy cập Ngân hàng trực tuyến VCB Digibank (
                                <span style={{ textDecoration: 'underline', color: '#0d6efd' }}>https://www.vietcombank.com.vn/IBanking2020/</span>), và thực hiện chuyển
                                đổi sang dịch vụ VCN Digibank theo hướng dẫn của Vietcombank.
                            </p>
                            </div>
                            
                            <div>
                                <p><span style={{ fontWeight: '700' }}>Cách 2:</span> Đăng ký tại vầy giao dịch của Vietcombank.</p>
                            </div>
                            
                        </div>
                        <div>
                            <p className="mb-0" style={{ fontWeight: '700' }}>Hạn mức thanh toán:</p>
                            <p>200,000,000 VND/giao dịch</p>
                        </div>
                        <div>
                            <p><span style={{ fontWeight: '700' }}>Tổng đài hỗ trợ Vietcombank: </span>(+84) 1900 545413</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Conduct;