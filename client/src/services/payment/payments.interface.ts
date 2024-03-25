export interface Payment {
    id?: string | number;
    id_user?: string | number;
    totalQuantity: string | number;
    paymentMethod: string;
    time: string;
    totalPayment: string | number;
    paymentStatus?: string;
    seats: string[];
    order_code: string;
    name_cinemas: string;
    name_movie: string;
    name_room: string;
}

export interface PaymentState {
    payments: Payment[]
}