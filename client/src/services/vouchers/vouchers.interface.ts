export interface Voucher {
    id?: string | number;
    code: string;
    name: string;
    discount: string | number;
    startDate: string;
    endDate: string;
    quantity: string | number;
    condition: string;
}

export interface VoucherState {
    vouchers: Voucher[]
}