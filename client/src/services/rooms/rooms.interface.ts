export interface Room {
    id?: string | number;
    id_cinema: string | number;
    quantity: string | number;
}

export interface RoomState {
    rooms: Room[]
}