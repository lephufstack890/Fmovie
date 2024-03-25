import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
        getMoviesByStatus: builder.query({
            query: (status: string) => ({
                url: `/filter-by-status/${status}`
            })
        })
    }),
});

export const { useGetMoviesListQuery, useGetMoviesByStatusQuery, useGetMoviesQuery } = moviesApi;
