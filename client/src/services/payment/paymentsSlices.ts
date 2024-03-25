import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentState, Payment } from "./payments.interface";


const initialState: PaymentState = {
    payments: []
}

const paymentSlice = createSlice({
    name: 'payments',
    initialState: initialState,
    reducers: {
        addNewPayment: (state, action: PayloadAction<Payment>) => {
            state.payments.push(action.payload)
        },
    }
})

export const { addNewPayment } = paymentSlice.actions
export default paymentSlice.reducer