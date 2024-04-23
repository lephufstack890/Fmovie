interface SeatQuantities {
    regular: number;
    vip: number;
    double: number;
}

export interface TimeShow {
    id?: string | number;
    name: string;
    id_room: string;
    seat_quantities: string | SeatQuantities | undefined ;
}

export interface TimeShowState {
    timeshows: TimeShow[]
}