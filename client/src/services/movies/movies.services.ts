import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from "./movies.interface"

export const moviesApi = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/movies",
    }),
    tagTypes: ["Movies"],
    endpoints: (builder) => ({
        getMoviesList: builder.query({
            query: () => ``,
            providesTags: ["Movies"],
        }),
        getMovies: builder.query({
            query: (id: string | number) => ({
                url: `/${id}`,
                method: "GET",
            }),
        }),
        addMovies: builder.mutation<Movie[], Movie>( {
            query: ( movie ) => ( {
                url: ``,
                method: 'POST',
                body: movie
            } ),
            invalidatesTags: [ 'Movies' ]
        } ),
        editMovies: builder.mutation<Movie[], Movie>( {
            query: ( movie ) => ( {
                url: `/${ movie.id }`,
                method: 'PATCH',
                body: movie
            } ),
            invalidatesTags: [ 'Movies' ]
        } ),
        deleteMovies: builder.mutation<Movie[], string | number>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Movies' ],
        } ),
        getMoviesByStatus: builder.query({
            query: (status: string) => ({
                url: `/filter-by-status/${status}`
            })
        })
    }),
});

export const { useGetMoviesListQuery, useGetMoviesByStatusQuery, useGetMoviesQuery, useAddMoviesMutation, useDeleteMoviesMutation, useEditMoviesMutation } = moviesApi;
