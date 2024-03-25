export interface ShowTime {
    id?: string | number;
    id_movie?: string | number;
    id_cinema?: string | number;
    showDate: string;
    showTime: string;
    releaseDate: string;
    language: string;
    id_room?: string | number;
}

export interface ShowTimeState {
    showtimes: ShowTime[]
}