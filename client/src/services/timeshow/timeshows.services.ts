import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { TimeShow } from './timeshows.interface';

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
        addTimeShow: builder.mutation<TimeShow[], TimeShow>( {
            query: ( timeshow ) => ( {
                url: ``,
                method: 'POST',
                body: timeshow
            } ),
            invalidatesTags: [ 'TimeShow' ]
        } ),
        editTimeShow: builder.mutation<TimeShow[], TimeShow>( {
            query: ( timeshow ) => ( {
                url: `/${ timeshow.id }`,
                method: 'PATCH',
                body: timeshow
            } ),
            invalidatesTags: [ 'TimeShow' ]
        } ),
        deleteTimeShow: builder.mutation<TimeShow[], string | number>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'TimeShow' ],
        } ),
    } )
} )

export const { useGetTimeShowListQuery, useGetTimeShowQuery, useAddTimeShowMutation, useDeleteTimeShowMutation, useEditTimeShowMutation } = timeshowApi    