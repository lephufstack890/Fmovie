import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { ShowTime } from './schedules.interface';

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
        // getShowTime: builder.query( {
        //     query: ( id: string | number ) => ( {
        //         url: `/${ id }`,
        //         method: 'GET',
        //     } ),
        //     providesTags: [ 'ShowTime' ]
        // } ),
    } )
} )

export const { useGetDayMovieListQuery } = daymovieApi    