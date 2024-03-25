import { useEffect, useState } from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { FaTicketAlt, FaPlayCircle } from "react-icons/fa";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { cn } from "@/lib/utils";
import Showtime from "../show-time/Showtime";
import Trailer from "../trailer/Trailer";
import { useGetMoviesByStatusQuery } from "@/services/movies/movies.services";
import { Movie } from "@/services/movies/movies.interface";

type Props = {};

const ListMovie = (props: Props) => {
    const [activeTab, setActiveTab] = useState("PHIM SẮP CHIẾU");
    const [modal, setModal] = useState("");
    const [status, setStatus] = useState('Phim sắp chiếu')
    const handleGetMovie = (status: string, active: string) => {
        setActiveTab(active)
        setStatus(status)
    }
    const { data: movies } = useGetMoviesByStatusQuery(status)
    
    return (
        <Drawer>
            <div className="list-movies">
                {/* nav */}
                <div className="flex justify-center">
                    <ul className="list-movies__nav flex justify-center">
                        <li
                            onClick={() => handleGetMovie("Phim sắp chiếu","PHIM SẮP CHIẾU")}
                            className={`nav-item ${
                                activeTab === "PHIM SẮP CHIẾU" ? "active" : ""
                            }`}
                        >
                            PHIM SẮP CHIẾU
                        </li>
                        <li
                            onClick={() => handleGetMovie("Phim đang chiếu","PHIM ĐANG CHIẾU")}
                            className={`nav-item ${
                                activeTab === "PHIM ĐANG CHIẾU" ? "active" : ""
                            }`}
                        >
                            PHIM ĐANG CHIẾU
                        </li>
                        <li
                            onClick={() => handleGetMovie("Suất chiếu đặc biệt","SUẤT CHIẾU ĐẶC BIỆT")}
                            className={`nav-item ${
                                activeTab === "SUẤT CHIẾU ĐẶC BIỆT"
                                    ? "active"
                                    : ""
                            }`}
                        >
                            SUẤT CHIẾU ĐẶC BIỆT
                        </li>
                    </ul>
                </div>
                {/* list movie */}
                <div className="list-movie flex ">
                    {movies?.data?.map((movie: Movie) => (

                    <div className="movie-item" key={movie.id}>
                        <DrawerTrigger className={cn('p-0 ')}>
                            <div className={cn('movie-item__image ') }>
                                <img
                                    src={movie.image}
                                    alt=""
                                />
                                <div
                                    onClick={() => setModal("trailer")}
                                    className="movie-item__overlay flex items-center justify-center"
                                >
                                    <div className="play-icon flex items-center justify-center">
                                        <FaPlayCircle className="icon" />
                                    </div>
                                </div>
                            </div>
                        </DrawerTrigger>
                        <div className="movie-item__bottom">
                            <Link className="movie-item__title" to={`/movie/${movie.id}`}>
                                {movie.name}
                            </Link>
                            <p>
                                <strong>Thể loại:</strong>{movie.detail.categories.map((category) => category.name).join(', ')}
                            </p>
                            <p>
                                <strong>Thời lượng:</strong> {movie.time} phút
                            </p>
                            <DrawerTrigger
                                onClick={() => setModal("showtime")}
                                className={cn("btn-ticket")}
                            >
                                mua vé
                                <div className="icon-ticket flex items-center justify-center">
                                    <FaTicketAlt className="icon" />
                                </div>
                            </DrawerTrigger>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            {modal !== "trailer" ? (
                <DrawerContent
                    className={cn(
                        "mx-auto top-[18%]  fixed max-w-[1000px] w-full transform  h-[500px] overflow-hidden"
                    )}
                >
                    <Showtime />
                </DrawerContent>
            ) : (
                <DrawerContent
                    className={cn(
                        "mx-auto top-[18%] fixed max-w-[50%] w-full transform  max-h-[530px] overflow-hidden"
                    )}
                >
                    <Trailer />
                </DrawerContent>
            )}
           
        </Drawer>
    );
};

export default ListMovie;
