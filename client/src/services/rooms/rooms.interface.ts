export interface Room {
    id?: string | number;
    id_cinema: string | number;
    name: string;
}

export interface RoomState {
    rooms: Room[]
}