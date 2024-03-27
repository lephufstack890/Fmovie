import { useState } from 'react';
import CloseIcon from "@/assets/icon/CloseIcon";
import { DrawerClose } from "../ui/drawer";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import "./index.scss";
import { useGetMoviesQuery } from "@/services/movies/movies.services";

interface DayMovie {
    id: number;
    day: number;
    month_rank: string;
}

interface TimeShow {
    id: number,
    available_seats: number,
    name: string
}

const Showtime = ({ idMovie }: { idMovie: number }) => {

    const [activeTab, setActiveTab] = useState<number>(1);

    const { data: movie } = useGetMoviesQuery(idMovie)

    const handleTabClick = (id: number) => {
        setActiveTab(id);
    };

    return (
        <>
            <div className="bg-white text-[#333] p-6   max-w-[1000px] w-full">
                <div className="flex justify-between border-b">
                    <h1 className="uppercase text-2xl  font-normal">
                        Lịch chiếu - <span>{movie?.data.name}</span>
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
                    {movie?.data.day_movies.map((item: DayMovie, index: number) => (      
                        <div key={index} className={activeTab === item?.id ? 'text-4xl font-base nav-item active' : 'text-4xl font-base nav-item'}>
                            <NavLink to="" onClick={() => handleTabClick(item?.id)}>
                                {item?.day}
                                <span className={cn("text-base pl-1")}>/{item?.month_rank}</span>
                            </NavLink>
                        </div>
                     ))}
                </div>
                <h3 className="pl-[15px] text-[18px] text-[#333] uppercase font-normal">
                    2D Phụ đề
                </h3>
                <div className="flex ">
                    {movie?.data.time_shows.map((item: TimeShow, index: number) => (
                        <div key={index} className='mr-4'>
                            <NavLink to={`/ticket/${item?.id}`} className="px-[5px] text-[#333] cursor-pointer">
                                <div className="bg-[#E5E5E5] text-[#333] text-center text-sm py-1">
                                    {item?.name}
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-normal text-center px-4"
                                    )}
                                >
                                    {item?.available_seats} ghế trống
                                </span>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Showtime;
