import {useCallback, useEffect} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import './HeaderWebsite.scss'
import {useSelector} from "react-redux";
import {User} from "@/services/auth/auth.interface";
import {useGetUserMutation, useLogoutMutation} from "@/services/auth/auth.services.ts";
import {getUserToken, logout} from "@/services/auth/authSlices.ts";
import {useAppDispatch} from "@/app/hooks.ts";

const HeaderWebsite = () => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    // const [ isLogged, setIsLogged ] = React.useState<boolean>(true);
    const user = useSelector((state: any) => state.auth.user) as User;
    const token = useSelector((state: any) => state.auth.token);
    const [logoutMutation] = useLogoutMutation();
    const [getUser] = useGetUserMutation()
    const handleLogout = useCallback(async () => {
        await logoutMutation(token);
        dispatch(logout());
    }, [logoutMutation, dispatch, token]);

    const Menu = [
        {
            title: "Lịch Chiếu Theo Rạp",
            linkTo: "/schedule"
        },
        {
            title: "Phim",
            linkTo: "/movie"
        },
        {
            title: "Rạp",
            linkTo: "/cinema"
        },
        // {
        //     title: "Giá Vé",
        //     linkTo: ""
        // },
        // {
        //     title: "Tin Mới và Ưu Đãi",
        //     linkTo: ""
        // },
        // {
        //     title: "Nhượng Quyền",
        //     linkTo: ""
        // },
        // {
        //     title: "Thành Viên",
        //     linkTo: "/register"
        // },
    ]


    useEffect(() => {
        if (token) {
            const getUserByToken = async (token:string) => {
                await getUser(token).unwrap().then((result) => {
                    // console.log(result);
                    
                    dispatch(getUserToken(result))
                })
                
            }
            getUserByToken(token)
        } else {
            navigate('/login')
        }
        
    }, [token])
    return (
        <div className='w-full h-full '>
            <div className="pre-header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 additional-nav">
                            <div className="pull-right padding-left-10">
                                <a href="#"></a>
                            </div>
                            <ul className="list-unstyled list-inline pull-right">
                                {user ?
                                    <>
                                        <li>
                                            <span className="me-1" style={{fontSize: "12px"}}>Xin chào</span>
                                            <a href="#" className="text-primary">{user?.name}</a>
                                        </li>
                                        <li><a className="cursor-pointer" onClick={() => handleLogout()}>Đăng xuất</a></li>
                                    </>
                                    :
                                    <>
                                        <li><a className="cursor-pointer" onClick={() => navigate('/login')}>Đăng
                                            nhập</a></li>
                                        <li><a className="cursor-pointer" onClick={() => navigate("/register")}>Đăng
                                            ký</a></li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header">
                <div className="container">
                    <div className="row" style={{ justifyContent: 'space-between' }}>
                        <div className="col-md-2">
                            <NavLink className="site-logo" to="/">
                                <img style={{width: '100px'}}
                                     src="https://i.gyazo.com/f42624877a99b415498194df29e2e45b.png" alt=""/>
                            </NavLink>
                        </div>
                        {/* <div className="col-md-2">
                            <div className="top-cart-block">
                                <div className="top-cart-info">
                                    <div className="header-navigation menu-cinema">
                                        <ul>
                                            <li className="dropdown">
                                                <a className="dropdown-toggle" data-toggle="dropdown" data-target="#"
                                                   href="javascript:;">Beta Thái Nguyên <i
                                                    className="fa fa-angle-down"></i>
                                                </a>
                                                <ul className="dropdown-menu">
                                                    <li className="dropdown-submenu">
                                                        <a>Hà Nội</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li><a>Beta Thanh Xuân</a></li>
                                                            <li><a>Beta Mỹ Đình</a></li>
                                                            <li><a>Beta Đan Phượng</a></li>
                                                            <li><a>Beta Giải Phóng</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu">
                                                        <a>TP. Hồ Chí Minh</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li><a>Beta Quang Trung</a></li>
                                                            <li><a>Beta Trần Quang Khải</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu">
                                                        <a>Bắc Giang</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li><a>Beta Bắc Giang</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu">
                                                        <a>Đồng Nai</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li><a>Beta Biên Hòa</a></li>
                                                            <li><a>Beta Long Khánh</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu">
                                                        <a>Khánh Hòa</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li><a>Beta Nha Trang</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu">
                                                        <a>Thái Nguyên</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li><a>Beta Thái Nguyên</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu">
                                                        <a>Thanh Hóa</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li><a>Beta Thanh Hóa</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu">
                                                        <a>Bà Rịa - Vũng Tàu</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li><a>Beta Phú Mỹ</a></li>
                                                            <li><a>Beta Hồ Tràm</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu">
                                                        <a>Bình Dương</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li><a>Beta Empire Bình Dương</a></li>
                                                            <li><a>Beta Tân Uyên</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu">
                                                        <a>Kiên Giang</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li><a>Beta TRMall Phú Quốc</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="dropdown-submenu">
                                                        <a>Lào Cai</a>
                                                        <ul className="dropdown-menu" role="menu">
                                                            <li>
                                                                <a>Beta Lào Cai</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="col-md-9">
                            <div className="header-navigation pull-right list-menu">
                                <ul>
                                    {Menu?.map((item, index) => (
                                        <li key={index}>
                                            <NavLink to={item?.linkTo} className='item'>{item?.title}</NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderWebsite