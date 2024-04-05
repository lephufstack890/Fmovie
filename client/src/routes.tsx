import {
    Navigate,
    Outlet,
    createBrowserRouter,
    useNavigate,
} from "react-router-dom";
import LayoutAdmin from "./layout/admin/LayoutAdmin";
import LayoutWebsite from "./layout/website/LayoutWebsite";
import {
    CinemaPage,
    Dashboard,
    HomePage,
    MoviePage,
    MovieTypeAddPage,
    MovieTypeEditPage,
    MovieTypeListPage,
    PageNotFound,
    SchedulePage,
    CinemaPageAdmin,
    CinemaAddPage,
    CinemaEditPage,
    VoucherPageAdmin,
    VoucherAddPage,
    VoucherEditPage,
    SeatPageAdmin,
    SeatAddPage,
    SeatEditPage,
    LoginPage,
    RegisterPage,
    TrailerPageAdmin,
    TrailerAddPage,
    TrailerEditPage,
    TimeShowPageAdmin,
    TimeShowAddPage,
    TimeShowEditPage,
    DayMoviePageAdmin,
    DayMovieAddPage,
    DayMovieEditPage,
    RoomPageAdmin,
    RoomAddPage,
    RoomEditPage,
    MoviePageAdmin,
    MovieAddPage,
    MovieEditPage,
} from "./pages";

import TicketPage from "./pages/ticket/TicketPage";
import DetailMoviePage from "./pages/detailMovie/DetailMoviePage";
import { useEffect } from "react";
import { useAppSelector } from "./app/hooks";
import { useGetUserMutation } from "./services/auth/auth.services";

const PriviteRouter = () => {
    const navigate = useNavigate();
    const [getUser] = useGetUserMutation();

    const token = useAppSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            getUser(token)
                .unwrap()
                .then((response) => {
                    if (response.role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("*");
                    }
                })
                .catch((error: unknown) => {
                    // console.log(error);
                });
        }
    }, [getUser, token]);

    return token ? <Outlet /> : <Navigate to={"/login"} />;
};



export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutWebsite />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "movie", element: <MoviePage /> },
            { path: "movie/:id", element: <DetailMoviePage /> },
            { path: "schedule", element: <SchedulePage /> },
            { path: "cinema", element: <CinemaPage /> },
            { path: "ticket/:id", element: <TicketPage /> },
        ],
    },
    {
        path: "/admin",
        element: <PriviteRouter />,
        children: [
            {
                element: <LayoutAdmin />,
                children: [
                    { index: true, element: <Dashboard /> },
                    { path: "movie-type", element: <MovieTypeListPage /> },
                    { path: "movie-type/add", element: <MovieTypeAddPage /> },
                    {
                        path: "movie-type/edit/:id",
                        element: <MovieTypeEditPage />,
                    },
                    { path: "cinema", element: <CinemaPageAdmin /> },
                    { path: "cinema/add", element: <CinemaAddPage /> },
                    { path: "cinema/edit/:id", element: <CinemaEditPage /> },
                    { path: "voucher", element: <VoucherPageAdmin /> },
                    { path: "voucher/add", element: <VoucherAddPage /> },
                    { path: "voucher/edit/:id", element: <VoucherEditPage /> },
                    { path: "movie", element: <MoviePageAdmin /> },
                    { path: "movie/add", element: <MovieAddPage /> },
                    { path: "movie/edit/:id", element: <MovieEditPage /> },
                    { path: "seat", element: <SeatPageAdmin /> },
                    { path: "seat/add", element: <SeatAddPage /> },
                    { path: "seat/edit/:id", element: <SeatEditPage /> },
                    { path: "trailer", element: <TrailerPageAdmin /> },
                    { path: "trailer/add", element: <TrailerAddPage /> },
                    { path: "trailer/edit/:id", element: <TrailerEditPage /> },
                    { path: "time-show", element: <TimeShowPageAdmin /> },
                    { path: "time-show/add", element: <TimeShowAddPage /> },
                    { path: "time-show/edit/:id", element: <TimeShowEditPage /> },
                    { path: "day-movie", element: <DayMoviePageAdmin /> },
                    { path: "day-movie/add", element: <DayMovieAddPage /> },
                    { path: "day-movie/edit/:id", element: <DayMovieEditPage /> },
                    { path: "room", element: <RoomPageAdmin /> },
                    { path: "room/add", element: <RoomAddPage /> },
                    { path: "room/edit/:id", element: <RoomEditPage /> },
                ],
            },
        ],
    },
    { path: "*", element: <PageNotFound /> },
]);
