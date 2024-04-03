import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DayMovie } from './daymovies.interface';

export const daymovieApi = createApi( {
    reducerPath: 'daymovieApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://127.0.0.1:8000/api/daymovies'
    } ),
    tagTypes: [ 'DayMovie' ],
    endpoints: ( builder ) => ( {
        getDayMovieList: builder.query( {
            query: () => ``,
            providesTags: [ 'DayMovie' ]
        } ),
        getDayMovie: builder.query({
            query: (id: string | number) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: [ 'DayMovie' ]
        }),
        addDayMovie: builder.mutation<DayMovie[], DayMovie>( {
            query: ( daymovie ) => ( {
                url: ``,
                method: 'POST',
                body: daymovie
            } ),
            invalidatesTags: [ 'DayMovie' ]
        } ),
        editDayMovie: builder.mutation<DayMovie[], DayMovie>( {
            query: ( daymovie ) => ( {
                url: `/${ daymovie.id }`,
                method: 'PATCH',
                body: daymovie
            } ),
            invalidatesTags: [ 'DayMovie' ]
        } ),
        deleteDayMovie: builder.mutation<DayMovie[], string | number>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'DayMovie' ],
        } ),
    } )
} )

export const { useGetDayMovieListQuery, useAddDayMovieMutation, useDeleteDayMovieMutation, useEditDayMovieMutation, useGetDayMovieQuery } = daymovieApi    