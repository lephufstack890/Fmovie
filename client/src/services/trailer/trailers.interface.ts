export interface Trailer {
    id?: string | number;
    url: string;
    dateShow: string;
}

export interface TrailerState {
    trailers: Trailer[]
}