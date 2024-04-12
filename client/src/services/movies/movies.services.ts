import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from "./movies.interface"

export const moviesApi = createApi({
    reducerPath: "moviesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
    }),
    tagTypes: ["Movies"],
    endpoints: (builder) => ({
        getMoviesList: builder.query({
            query: () => ({
                url: `/movies`,
                method: "GET",
            }),
            providesTags: ["Movies"],
        }),
        getMovies: builder.query({
            query: (id: string | number) => ({
                url: `/movies/${id}`,
                method: "GET",
            }),
        }),
        addMovies: builder.mutation<Movie[], Movie>( {
            query: ( movie ) => ( {
                url: `/movies`,
                method: 'POST',
                body: movie
            } ),
            invalidatesTags: [ 'Movies' ]
        } ),
        editMovies: builder.mutation<Movie[], Movie>( {
            query: ( movie ) => ( {
                url: `/movies/${ movie.id }`,
                method: 'PATCH',
                body: movie
            } ),
            invalidatesTags: [ 'Movies' ]
        } ),
        deleteMovies: builder.mutation<Movie[], string | number>( {
            query: ( id ) => ( {
                url: `/movies/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Movies' ],
        } ),
        getMoviesByStatus: builder.query({
            query: (status: string) => ({
                url: `/movies/filter-by-status/${status}`
            })
        }),
        getMoviesByDate: builder.query({
            query: (id: number | string) => ({
                url: `/movies/filter/${id}`
            })
        }),
        uploadImage: builder.mutation<File, FormData>({
            query: (formData) => ({
                url: `/upload/file`, // Địa chỉ API của bạn để xử lý tải lên hình ảnh
                method: 'POST',
                body: formData,
                // headers: {
                //     'Content-Type': 'multipart/form-data', // Đảm bảo gửi dữ liệu dưới dạng FormData
                // },
            }),
        }),
    }),
});

export const { useGetMoviesListQuery, useGetMoviesByStatusQuery, useGetMoviesQuery, useAddMoviesMutation, useDeleteMoviesMutation, useEditMoviesMutation, useGetMoviesByDateQuery, useUploadImageMutation } = moviesApi;
