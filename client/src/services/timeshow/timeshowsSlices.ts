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
    }
})

export const { loadTimeShowList } = timeshowSlice.actions
export default timeshowSlice.reducer