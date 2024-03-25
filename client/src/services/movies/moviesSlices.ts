import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieState, Movie } from "./movies.interface";


const initialState: MovieState = {
    movies: []
}

const movieSlice = createSlice({
    name: 'movies',
    initialState: initialState,
    reducers: {
        loadMovieList: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload
        },
        addNewMovie: (state, action: PayloadAction<Movie>) => {
            state.movies.push(action.payload)
        },
        editNewMovie: (state, action: PayloadAction<Movie>) => {
            const newMovie = action.payload
            state.movies = state.movies.map((movie) => movie.id === newMovie.id ? newMovie : movie)
        },
        deleteMovie: (state, action: PayloadAction<string | number>) => {
            state.movies = state.movies.filter((movie) => movie.id !== action.payload)
        }
    }
})

export const { addNewMovie, loadMovieList, editNewMovie, deleteMovie } = movieSlice.actions
export default movieSlice.reducer