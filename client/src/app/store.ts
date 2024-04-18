import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { categoryApi } from "@/services/categories/categories.services";
import categoriesSlices from "@/services/categories/categoriesSlices";
import { moviesApi } from "@/services/movies/movies.services";
import movieSlice from "@/services/movies/moviesSlices";

import { voucherApi } from "@/services/vouchers/vouchers.services";
import vouchersSlices from "@/services/vouchers/vouchersSlices";

import { cinemasApi } from "@/services/cinema/cinemas.services";
import cinemasSlices from "@/services/cinema/cinemasSlices";
// import {  cinemasApi } from '../services/cinema/cinemas.services';
// import cinemasSlices from "@/services/cinema/cinemasSlices";

import { seattypeApi } from "@/services/seatstype/seatstype.services";
import seatstypeSlices from "@/services/seatstype/seatstypeSlices";
import { roomApi } from "@/services/rooms/rooms.services";
import roomsSlices from "@/services/rooms/roomsSlices";
import { seatApi } from "@/services/seats/seats.services";
import seatsSlices from "@/services/seats/seatsSlices";

import { authApi } from "@/services/auth/auth.services";
import authSlice from "@/services/auth/authSlices";

import { showtimeApi } from "@/services/schedule/schedules.services";
import showtimeSlice from "@/services/schedule/schedulesSlices";

import { paymentApi } from "@/services/payment/payments.services";
import paymentSlice from "@/services/payment/paymentsSlices";

import { daymovieApi } from "@/services/daymovie/daymovies.services";
import daymovieSlice from "@/services/daymovie/daymoviesSlices";

import { timeshowApi } from "@/services/timeshow/timeshows.services";
import timeshowSlice from "@/services/timeshow/timeshowsSlices";

import { trailerApi } from "@/services/trailer/trailers.services";
import trailersSlices from "@/services/trailer/trailersSlices";

import { userApi } from "@/services/users/users.services";
import usersSlices from "@/services/users/usersSlices";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"],
};
const rootReducer = combineReducers({
    //category
    [categoryApi.reducerPath]: categoryApi.reducer,
    categories: categoriesSlices,
    //room
    [roomApi.reducerPath]: roomApi.reducer,
    rooms: roomsSlices,
    //movies
    [moviesApi.reducerPath]: moviesApi.reducer,
    movies: movieSlice,

    //voucher
    [voucherApi.reducerPath]: voucherApi.reducer,
    vouchers: vouchersSlices,

    //cinemas
    [cinemasApi.reducerPath]: cinemasApi.reducer,
    cinemas: cinemasSlices,
   

    //seattype
    [seattypeApi.reducerPath]: seattypeApi.reducer,
    seatstype: seatstypeSlices,
    //seats
    [seatApi.reducerPath]: seatApi.reducer,
    seats: seatsSlices,


    //auth
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,

    //schedule
    [showtimeApi.reducerPath]: showtimeApi.reducer,
    showtimes: showtimeSlice,

    //payment
    [paymentApi.reducerPath]: paymentApi.reducer,
    payments: paymentSlice,

    //daymovie
    [daymovieApi.reducerPath]: daymovieApi.reducer,
    daymovies: daymovieSlice,

    //timeshow
    [timeshowApi.reducerPath]: timeshowApi.reducer,
    timeshows: timeshowSlice,

    //trailer
    [trailerApi.reducerPath]: trailerApi.reducer,
    trailers: trailersSlices,

    //user
    [userApi.reducerPath]: userApi.reducer,
    users: usersSlices,
});
const middleware = [
    categoryApi.middleware,
    moviesApi.middleware,

    voucherApi.middleware,

    cinemasApi.middleware,

    seattypeApi.middleware,
    roomApi.middleware,
    seatApi.middleware,

    authApi.middleware,

    showtimeApi.middleware,

    paymentApi.middleware,

    daymovieApi.middleware,

    timeshowApi.middleware,

    trailerApi.middleware,

    userApi.middleware,
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(...middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default persistStore(store);
