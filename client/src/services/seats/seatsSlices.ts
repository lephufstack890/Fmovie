import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Seat, SeatState } from "./seats.interface";

const initialState: SeatState = {
    seats: []
}

const seatSlice = createSlice({
    name: 'seats',
    initialState: initialState,
    reducers: {
        addNewSeat: (state, action: PayloadAction<Seat>) => {
            state.seats.push(action.payload)
        },
        loadSeatList: (state, action: PayloadAction<Seat[]>) => {
            state.seats = action.payload
        },
        editNewSeat: (state, action: PayloadAction<Seat>) => {
            const newSeat = action.payload
            state.seats = state.seats.map((seat) => seat.id === newSeat.id ? newSeat : seat)
        },
        deleteSeat: (state, action: PayloadAction<string | number>) => {
            state.seats = state.seats.filter((seat) => seat.id !== action.payload)
        }

        }
})

export const { addNewSeat, loadSeatList, editNewSeat, deleteSeat } = seatSlice.actions
export default seatSlice.reducer