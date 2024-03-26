export interface DayMovie {
    id?: string | number;
    day: string | number;
    month_rank: string;
}

export interface DayMovieState {
    daymovies: DayMovie[]
}