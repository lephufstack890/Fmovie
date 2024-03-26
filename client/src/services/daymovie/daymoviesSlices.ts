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
    }
})

export const { loadDayMovieList } = daymovieSlice.actions
export default daymovieSlice.reducer