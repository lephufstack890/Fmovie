import CloseIcon from "@/assets/icon/CloseIcon";
import { DrawerClose } from "../ui/drawer";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import "./index.scss";
type Props = {};
const Showtime = () => {
    return (
        <>
            <div className="bg-white text-[#333] p-6   max-w-[1000px] w-full">
                <div className="flex justify-between border-b">
                    <h1 className="uppercase text-2xl  font-normal">
                        Lịch chiếu - <span>Mai</span>
                    </h1>
                    <DrawerClose>
                        <CloseIcon />
                    </DrawerClose>
                </div>
                <h2 className="font-normal text-3xl text-center m-0 pt-[15px] pb-[10px] border-b">
                    Rạp <span>Beta Thái Nguyên</span>
                </h2>
                {/*  */}
                <div className={cn("flex  list-showtime__nav")}>
                    <div className="text-4xl font-base nav-item active">
                        04
                        <span className={cn("text-base pl-1")}>/03 - T2</span>
                    </div>
                    <div className="text-4xl font-base nav-item ">
                        04
                        <span className={cn("text-base pl-1")}>/03 - T2</span>
                    </div>
                    <div className="text-4xl font-base nav-item ">
                        04
                        <span className={cn("text-base pl-1")}>/03 - T2</span>
                    </div>
                </div>
                <h3 className="pl-[15px] text-[18px] text-[#333] uppercase font-normal">
                    2D Phụ đề
                </h3>
                <div className="flex ">
                    <Link to={`/ticket/${1}`} className="px-[15px] text-[#333] cursor-pointer">
                        <div className="bg-[#E5E5E5] text-[#333] text-center text-sm py-1">
                            14:15
                        </div>
                        <span
                            className={cn(
                                "text-xs font-normal text-center px-4"
                            )}
                        >
                            168 ghế trống
                        </span>
                    </Link>
                    <Link to={`/ticket/${1}`} className="px-[15px] text-[#333] cursor-pointer">
                        <div className="bg-[#E5E5E5] text-[#333] text-center text-sm py-1">
                            14:15
                        </div>
                        <span
                            className={cn(
                                "text-xs font-normal text-center px-4"
                            )}
                        >
                            168 ghế trống
                        </span>
                    </Link>
                    <Link to={`/ticket/${1}`} className="px-[15px] text-[#333] cursor-pointer">
                        <div className="bg-[#E5E5E5]  text-center text-sm py-1">
                            14:15
                        </div>
                        <span
                            className={cn(
                                "text-xs font-normal text-center px-4"
                            )}
                        >
                            168 ghế trống
                        </span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Showtime;
