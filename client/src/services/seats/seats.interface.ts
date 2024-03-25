export interface Seat {
    id?: string | number
    id_room: string | number
    nameRow: string
    seatStatus: string
    id_seatstype: string | number
}

export interface SeatState {
    seats: Seat[]
}