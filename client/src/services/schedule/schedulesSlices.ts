import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShowTimeState, ShowTime } from "./schedules.interface";


const initialState: ShowTimeState = {
    showtimes: []
}

const showtimeSlice = createSlice({
    name: 'showtimes',
    initialState: initialState,
    reducers: {
        loadShowTimeList: (state, action: PayloadAction<ShowTime[]>) => {
            state.showtimes = action.payload
        },
    }
})

export const { loadShowTimeList } = showtimeSlice.actions
export default showtimeSlice.reducer