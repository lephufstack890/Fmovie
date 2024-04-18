import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentState, Payment } from "./payments.interface";


const initialState: PaymentState = {
    payments: []
}

const paymentSlice = createSlice({
    name: 'payments',
    initialState: initialState,
    reducers: {
        loadPaymentList: (state, action: PayloadAction<Payment[]>) => {
            state.payments = action.payload
        },
        addNewPayment: (state, action: PayloadAction<Payment>) => {
            state.payments.push(action.payload)
        },
        deletePayment: (state, action: PayloadAction<string | number>) => {
            state.payments = state.payments.filter((payment) => payment.id !== action.payload)
        }
    }
})

export const { addNewPayment, loadPaymentList, deletePayment } = paymentSlice.actions
export default paymentSlice.reducer