import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayMovieState, DayMovie } from "./daymovies.interface";


const initialState: DayMovieState = {
    daymovies: []
}

const daymovieSlice = createSlice({
    name: 'daymovies',
    initialState: initialState,
    reducers: {
        loadDayMovieList: (state, action: PayloadAction<DayMovie[]>) => {
            state.daymovies = action.payload
        },
        addNewDayMovie: (state, action: PayloadAction<DayMovie>) => {
            state.daymovies.push(action.payload)
        },
        editNewDayMovie: (state, action: PayloadAction<DayMovie>) => {
            const newDayMovie = action.payload
            state.daymovies = state.daymovies.map((daymovie) => daymovie.id === newDayMovie.id ? newDayMovie : daymovie)
        },
        deleteDayMovie: (state, action: PayloadAction<string | number>) => {
            state.daymovies = state.daymovies.filter((daymovie) => daymovie.id !== action.payload)
        }
    }
})

export const { loadDayMovieList, addNewDayMovie, editNewDayMovie, deleteDayMovie } = daymovieSlice.actions
export default daymovieSlice.reducer