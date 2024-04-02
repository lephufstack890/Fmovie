import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrailerState, Trailer } from "./trailers.interface";


const initialState: TrailerState = {
    trailers: []
}

const trailerSlice = createSlice({
    name: 'trailers',
    initialState: initialState,
    reducers: {
        loadTrailerList: (state, action: PayloadAction<Trailer[]>) => {
            state.trailers = action.payload
        },
        addNewTrailer: (state, action: PayloadAction<Trailer>) => {
            state.trailers.push(action.payload)
        },
        editNewTrailer: (state, action: PayloadAction<Trailer>) => {
            const newTrailer = action.payload
            state.trailers = state.trailers.map((trailer) => trailer.id === newTrailer.id ? newTrailer : trailer)
        },
        deleteTrailer: (state, action: PayloadAction<string | number>) => {
            state.trailers = state.trailers.filter((trailer) => trailer.id !== action.payload)
        }
    }
})

export const { addNewTrailer, loadTrailerList, editNewTrailer, deleteTrailer } = trailerSlice.actions
export default trailerSlice.reducer