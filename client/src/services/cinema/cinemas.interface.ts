export interface Cinema {
    id?: string | number
    name: string
    address: string
    screeningRooms: string | number
    description: string
    phoneContact: string
    // image: string
}

export interface CinemaState {
    cinemas: Cinema[]
}