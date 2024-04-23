export interface Movie {
    id?: number;
    name: string;
    description: string;
    status: string;
    time: string;
    director: string;
    actor: string;
    releaseDate: string;
    language: string;
    image: string;
    id_category?: string[] | number[] | undefined;
    id_trailer?: string | number;
    id_time?: string[] | number[];
    id_day_movie?: string[] | number[];
}

export interface MovieState {
    movies: Movie[]
}