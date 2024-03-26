import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { ShowTime } from './schedules.interface';

export const timeshowApi = createApi( {
    reducerPath: 'timeshowApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://127.0.0.1:8000/api/timeshows'
    } ),
    tagTypes: [ 'TimeShow' ],
    endpoints: ( builder ) => ( {
        getTimeShowList: builder.query( {
            query: () => ``,
            providesTags: [ 'TimeShow' ]
        } ),
        getTimeShow: builder.query( {
            query: ( id: string | number ) => ( {
                url: `/${ id }`,
                method: 'GET',
            } ),
            providesTags: [ 'TimeShow' ]
        } ),
    } )
} )

export const { useGetTimeShowListQuery, useGetTimeShowQuery } = timeshowApi    