import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User, AuthState} from "./auth.interface.ts";

const initialState: AuthState = {
    user: null,
    token: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            state.token = action.payload.token;
        },
        // register: (state, action: PayloadAction<Category[]>) => {
        //     state.categories = action.payload
        // },
        getUserToken: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = '';
        }
    }
})

export const {login, getUserToken, logout} = authSlice.actions;
export default authSlice.reducer;