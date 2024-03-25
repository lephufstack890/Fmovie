import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { ShowTime } from './schedules.interface';

export const showtimeApi = createApi( {
    reducerPath: 'showtimeApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://127.0.0.1:8000/api/showtimes'
    } ),
    tagTypes: [ 'ShowTime' ],
    endpoints: ( builder ) => ( {
        getShowTimeList: builder.query( {
            query: () => ``,
            providesTags: [ 'ShowTime' ]
        } ),
        getShowTime: builder.query( {
            query: ( id: string | number ) => ( {
                url: `/${ id }`,
                method: 'GET',
            } ),
            providesTags: [ 'ShowTime' ]
        } ),
    } )
} )

export const { useGetShowTimeListQuery, useGetShowTimeQuery } = showtimeApi    