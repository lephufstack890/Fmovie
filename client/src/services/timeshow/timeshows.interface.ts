export interface TimeShow {
    id?: string | number;
    name: string;
    id_room: string | number;
    seat_quantities: string ;
}

export interface TimeShowState {
    timeshows: TimeShow[]
}