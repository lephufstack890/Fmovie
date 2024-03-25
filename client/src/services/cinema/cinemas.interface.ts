export interface Cinema {
    id?: string | number
    name: string
    address: string
    screeningRooms: number
    description: string
    phoneContact: number
    image: string
}

export interface CinemaState {
    cinemas: Cinema[]
}