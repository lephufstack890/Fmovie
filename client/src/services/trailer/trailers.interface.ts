export interface Trailer {
    id?: string | number;
    id_movie?: string | number;
    url: string;
    dateShow: string;
}

export interface TrailerState {
    trailers: Trailer[]
}