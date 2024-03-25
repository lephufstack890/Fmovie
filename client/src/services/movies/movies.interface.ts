interface DetailMovie {
    trailer_url: string;
    categories: [
        {
            id?: string;
            name: string;
        }
    ];
}

export interface Movie {
    id?: string | number;
    name: string;
    description: string;
    time: string;
    director: string;
    actor: string;
    releaseDate: string;
    language: string;
    id_category: string[];
    image: string;
    id_trailer?: string | number;
    detail: DetailMovie;
}

export interface MovieState {
    movies: Movie[]
}