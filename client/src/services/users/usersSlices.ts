import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, User } from "./users.interface";


const initialState: UserState = {
    users: []
}

const userSlice = createSlice({
    name: 'vouchers',
    initialState: initialState,
    reducers: {
        loadUserList: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload
        },
        deleteUser: (state, action: PayloadAction<string | number>) => {
            state.users = state.users.filter((user) => user.id !== action.payload)
        }
    }
})

export const { loadUserList, deleteUser } = userSlice.actions
export default userSlice.reducer