import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cinema, CinemaState } from "./cinemas.interface";

const initialState: CinemaState = {
    cinemas: []
}

const cinemaSlice = createSlice({
    name: 'cinemas',
    initialState: initialState,
    reducers: {
        addNewCinema: (state, action: PayloadAction<Cinema>) => {
            state.cinemas.push(action.payload)
        },
        loadCinemaList: (state, action: PayloadAction<Cinema[]>) => {
            state.cinemas = action.payload
        },
        editNewCinema: (state, action: PayloadAction<Cinema>) => {
            const newCinema = action.payload
            state.cinemas = state.cinemas.map((cinema) => cinema.id === newCinema.id ? newCinema : cinema)
        },
        deleteCinema: (state, action: PayloadAction<string | number>) => {
            state.cinemas = state.cinemas.filter((cinema) => cinema.id !== action.payload)
        }

        }
})

export const { addNewCinema, loadCinemaList, editNewCinema, deleteCinema } = cinemaSlice.actions
export default cinemaSlice.reducer