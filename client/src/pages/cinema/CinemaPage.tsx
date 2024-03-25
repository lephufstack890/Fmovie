import { NavLink } from 'react-router-dom';


const CinemaPage: React.FC = () => {
  return (
    <div className='container'>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12 content">
          <h2 className='py-2 text-md font-semibold'>Beta Thái Nguyên</h2>
          <div className="box-content">
            <img className='py-6' src="https://files.betacorp.vn/files/ecm/2018/07/04/35359362-242694916502971-7052850785574453248-n-103924-040718-45.png" alt="" />
            <p className="des whitespace-pre-line  text-balance text-[9px] " style={{ fontSize: '14px' }}>
            Beta Cinemas Thái Nguyên có vị trí trung tâm, tọa lạc tại Hoàng Gia Plaza. Rạp tự hào là rạp phim tư nhân duy nhất và đầu tiên sở hữu hệ thống phòng chiếu phim đạt chuẩn Hollywood tại TP. Thái Nguyên.
<br />
<br />
Rạp được trang bị hệ thống máy chiếu, phòng chiếu hiện đại với 100% nhập khẩu từ nước ngoài, với 4 phòng chiếu tương được 535 ghế ngồi. Hệ thống âm thanh Dolby 7.1 và hệ thống cách âm chuẩn quốc tế đảm bảo chất lượng âm thanh sống động nhất cho từng thước phim bom tấn.
<br />
<br />

Mức giá xem phim tại Beta Cinemas Thái Nguyên rất cạnh tranh: giá vé 2D chỉ từ 40.000 VNĐ và giá vé 3D chỉ từ 60.000 VNĐ. Không chỉ có vậy, rạp còn có nhiều chương trình khuyến mại, ưu đãi hàng tuần như đồng giá vé 40.000 vào các ngày Thứ 3 vui vẻ, Thứ 4 Beta's Day, đồng giá vé cho Học sinh sinh viên, người cao tuổi, trẻ em.....
            </p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12 sidebar">
          <h2 className='text-center py-2 fw-bold'>PHIM ĐANG HOT</h2>
          <div className="row box-sidebar">
            <NavLink to="" className="col-lg-6 col-md-6 box-sidebar-item text-decoration-none">
              <img className='w-100 rounded-4' src="https://files.betacorp.vn/files/media%2fimages%2f2024%2f02%2f27%2f400x633%2D115125%2D270224%2D44.jpg" alt="" />
              <p className='text-center'><span className='fw-bold' style={{ fontSize: '16px' }}>Bà Thím Báo Thù</span></p>
            </NavLink>
            <NavLink to="" className="col-lg-6 col-md-6 box-sidebar-item text-decoration-none">
              <img className='w-100 rounded-4' src="https://files.betacorp.vn/files/media%2fimages%2f2024%2f02%2f16%2f427899998%2D400965622479480%2D1651967178044858107%2Dn%2D113518%2D160224%2D67.jpg" alt="" />
              <p className='text-center'><span className='fw-bold' style={{ fontSize: '16px' }}>Thanh Gươm Diệt Quỷ: Phép Màu Tình Thân, Cho Đến Chuyến Đặc Huấn Của Đại Trụ</span></p>
            </NavLink>
            <NavLink to="" className="col-lg-6 col-md-6 box-sidebar-item text-decoration-none">
              <img className='w-100 rounded-4' src="https://files.betacorp.vn/files/media%2fimages%2f2024%2f02%2f22%2fdao%2Dpho%2Dpiano%2D143054%2D220224%2D21.png" alt="" />
              <p className='text-center'><span className='fw-bold' style={{ fontSize: '16px' }}>Đào, Phở và Piano</span></p>
            </NavLink>
            <NavLink to="" className="col-lg-6 col-md-6 box-sidebar-item text-decoration-none">
              <img className='w-100 rounded-4' src="https://files.betacorp.vn/files/media%2fimages%2f2024%2f01%2f29%2fmaiiii%2D135926%2D290124%2D71.jpg" alt="" />
              <p className='text-center'><span className='fw-bold' style={{ fontSize: '16px' }}>Mai</span></p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinemaPage;
