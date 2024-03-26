
import './FooterWebsite.scss'
import { NavLink } from 'react-router-dom'
const FooterWebsite = () => {
  return (
    <div className="pre-footer">
        <div className="container">
          <div className="row">
              <div className="col-md-2">
                  <div id="BodyContent_ctl00_bottomPanel" className="ecm-panel">
                    <ul className="list-unstyled">
                        <li>
                            <NavLink to="/">
                              <img src="https://i.gyazo.com/f42624877a99b415498194df29e2e45b.png" alt="" style={{ width: '120px' }} />
                            </NavLink>
                        </li>
                        <li><NavLink to="" className="item-footer">Tuyển dụng</NavLink></li>
                        <li><NavLink to="" className="item-footer">Giới thiệu</NavLink></li>
                        <li><NavLink to="" className="item-footer">Liên hệ</NavLink></li>
                        <li><NavLink to="" className="item-footer">F.A.Q</NavLink></li>
                        <li><NavLink to="" className="item-footer">Hoạt động xã hội</NavLink></li>
                        <li><NavLink to="" className="item-footer">Điều khoản sử dụng</NavLink></li>
                        <li><NavLink to="" className="item-footer">Chính sách thanh toán, đổi trả - hoàn vé</NavLink></li>
                        <li><NavLink to="" className="item-footer">Liên hệ quảng cáo</NavLink></li>
                        <li><NavLink to="" className="item-footer">Điều khoản bảo mật</NavLink></li>
                        <li><NavLink to="" className="item-footer">Hướng dẫn đặt vé online</NavLink></li>
                      </ul>
                    </div>
              </div>
              <div className="col-md-10">
                  <div className="col-md-12">
                      <div className="row">
                        <ul className="col-md-4 list-unstyled" style={{ float: 'left' }}>
                          <h2 className='title-footer'>CỤM RẠP BETA</h2>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Lào Cai - Hotline 0358 968 970 </NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Trần Quang Khải, TP Hồ Chí Minh - Hotline 1900 638 362 </NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas TRMall Phú Quốc, Kiên Giang - Hotline 0983 474 440 </NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Empire Bình Dương - Hotline 0934 573 748 </NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Quang Trung, TP Hồ Chí Minh - Hotline 0706 075 509 </NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Giải Phóng, Hà Nội - Hotline 0585 680 360 </NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Thanh Xuân, Hà Nội - Hotline 082 4812878 </NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Mỹ Đình, Hà Nội - Hotline 0866 154 610</NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Đan Phượng, Hà Nội - Hotline 0983 901 714 </NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Thái Nguyên - Hotline 0867 460 053</NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Thanh Hóa - Hotline 0325 360 249</NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Bắc Giang - Hotline 0866 493 413</NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Nha Trang, Khánh Hòa - Hotline 0399 475 165</NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Biên Hòa, Đồng Nai - Hotline 0979 460 002</NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Long Khánh, Đồng Nai - Hotline 0925 165 684</NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Phú Mỹ, Bà Riạ Vũng Tàu - Hotline 0886 006 310 </NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Hồ Tràm, Bà Rịa Vũng Tàu - Hotline 0254 3788601 </NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Beta Cinemas Tân Uyên, Bình Dương - Hotline 0937 905 925 </NavLink></li>
                          <li> <NavLink to="" className='item-footer'>Tải Ứng Dụng Beta Cinemas</NavLink></li>    
                        </ul>
                        <div className="col-md-4">
                          <h2 className='title-footer'>KẾT NỐI VỚI CHÚNG TÔI</h2>
                          <ul className="social-icons">
                            <li><NavLink to="" className="facebook" data-original-title="facebook"></NavLink></li>
                            <li><NavLink to="" className="youtube" data-original-title="youtube"></NavLink></li>
                            <li><NavLink to="" className="tiktok" data-original-title="tiktok"></NavLink></li>
                            <li><NavLink to="" className="instagram" data-original-title="instagram"></NavLink></li>
                          </ul>
                          <img style={{ width: '180px' }} alt="" src="/Assets/Common/logo/dathongbao.png" />
                        </div>
                        <div className="col-md-4">
                          <h2 className='title-footer'>LIÊN HỆ</h2>
                          <div style={{ float: 'left' }}>
                            <h4 className="cty-title">CÔNG TY CỔ PHẦN BETA MEDIA</h4>
                            <h6 className='info-footer'>
                              Giấy chứng nhận ĐKKD số: 0106633482 - Đăng ký lần đầu ngày 08/09/2014 tại Sở Kế hoạch và Đầu tư Thành phố Hà Nội
                            </h6>
                            <h6 className='info-footer'>Địa chỉ trụ sở: Tầng 3, số 595, đường Giải Phóng, phường Giáp Bát, quận Hoàng Mai, thành phố Hà Nội</h6>
                            <p>
                            </p><h6 className='info-footer'>Hotline: 1900 636807</h6>
                            <h6 className='info-footer'>Email: cskh@betacorp.vn</h6>
                            <p>
                            </p>
                              <h4 style={{ fontSize: '16px' }}><strong>Liên hệ hợp tác kinh doanh:</strong>
                            </h4>
                            <h4 style={{ fontSize: '15px' }}>Email: bachtx@betagroup.vn</h4>
                            <h4 style={{ fontSize: '15px' }}>Điện thoại: 081 809 1118</h4>
                            <p></p>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default FooterWebsite