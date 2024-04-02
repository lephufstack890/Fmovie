import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TimeShowState, TimeShow } from "./timeshows.interface";


const initialState: TimeShowState = {
    timeshows: []
}

const timeshowSlice = createSlice({
    name: 'timeshows',
    initialState: initialState,
    reducers: {
        loadTimeShowList: (state, action: PayloadAction<TimeShow[]>) => {
            state.timeshows = action.payload
        },
        addNewTimeShow: (state, action: PayloadAction<TimeShow>) => {
            state.timeshows.push(action.payload)
        },
        editNewTimeShow: (state, action: PayloadAction<TimeShow>) => {
            const newTimeShow = action.payload
            state.timeshows = state.timeshows.map((timeshow) => timeshow.id === newTimeShow.id ? newTimeShow : timeshow)
        },
        deleteTimeShow: (state, action: PayloadAction<string | number>) => {
            state.timeshows = state.timeshows.filter((timeshow) => timeshow.id !== action.payload)
        }
    }
})

export const { loadTimeShowList, addNewTimeShow, editNewTimeShow, deleteTimeShow } = timeshowSlice.actions
export default timeshowSlice.reducer