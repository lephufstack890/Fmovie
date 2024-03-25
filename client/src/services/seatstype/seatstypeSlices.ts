import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SeatType, SeatTypeState } from "./seatstype.interface";

const initialState: SeatTypeState = {
    seatstype: []
}

const seattypeSlice = createSlice({
    name: 'seatstype',
    initialState: initialState,
    reducers: {
        addNewSeatType: (state, action: PayloadAction<SeatType>) => {
            state.seatstype.push(action.payload)
        },
        loadSeatTypeList: (state, action: PayloadAction<SeatType[]>) => {
            state.seatstype = action.payload
        },
        editNewSeatType: (state, action: PayloadAction<SeatType>) => {
            const newSeatType = action.payload
            state.seatstype = state.seatstype.map((seattype) => seattype.id === newSeatType.id ? newSeatType : seattype)
        },
        deleteSeatType: (state, action: PayloadAction<string | number>) => {
            state.seatstype = state.seatstype.filter((seattype) => seattype.id !== action.payload)
        }

        }
})

export const { addNewSeatType, loadSeatTypeList, editNewSeatType, deleteSeatType } = seattypeSlice.actions
export default seattypeSlice.reducer