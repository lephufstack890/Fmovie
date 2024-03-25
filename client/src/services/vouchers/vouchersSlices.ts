import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VoucherState, Voucher } from "./vouchers.interface";


const initialState: VoucherState = {
    vouchers: []
}

const voucherSlice = createSlice({
    name: 'vouchers',
    initialState: initialState,
    reducers: {
        loadVoucherList: (state, action: PayloadAction<Voucher[]>) => {
            state.vouchers = action.payload
        },
        addNewVoucher: (state, action: PayloadAction<Voucher>) => {
            state.vouchers.push(action.payload)
        },
        editNewVoucher: (state, action: PayloadAction<Voucher>) => {
            const newVoucher = action.payload
            state.vouchers = state.vouchers.map((voucher) => voucher.id === newVoucher.id ? newVoucher : voucher)
        },
        deleteVoucher: (state, action: PayloadAction<string | number>) => {
            state.vouchers = state.vouchers.filter((voucher) => voucher.id !== action.payload)
        }
    }
})

export const { addNewVoucher, loadVoucherList, editNewVoucher, deleteVoucher } = voucherSlice.actions
export default voucherSlice.reducer