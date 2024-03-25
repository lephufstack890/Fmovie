import { HeaderAdmin } from "../../components";
import SideBar from "../../components/side-bar/SideBar";
import "./LayoutAdmin.scss";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
    return (
        <>
            <div className="w-full flex h-full">
                <div className="w-1/5">
                    <SideBar />
                </div>
                <div className="w-full h-[8000px]">
                    <HeaderAdmin />
                    <div className="px-[4rem] pt-[4rem]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LayoutAdmin;
