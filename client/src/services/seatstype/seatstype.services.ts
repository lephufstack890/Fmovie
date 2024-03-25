import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SeatType } from './seatstype.interface';

export const seattypeApi = createApi( {
    reducerPath: 'seattypeApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://127.0.0.1:8000/api/seatstype'
    } ),
    tagTypes: [ 'SeatType' ],
    endpoints: ( builder ) => ( {
        getSeatTypeList: builder.query( {
            query: () => ``,
            providesTags: [ 'SeatType' ]
        } ),
        getSeatType: builder.query( {
            query: ( id: string | number ) => ( {
                url: `/${ id }`,
                method: 'GET',
            } ),
            providesTags: [ 'SeatType' ]
        } ),
        addSeatType: builder.mutation<SeatType[], SeatType>( {
            query: ( seattype ) => ( {
                url: ``,
                method: 'POST',
                body: seattype
            } ),
            invalidatesTags: [ 'SeatType' ]
        } ),
        editSeatType: builder.mutation<SeatType[], SeatType>( {
            query: ( seattype ) => ( {
                url: `/${ seattype.id }`,
                method: 'PATCH',
                body: seattype
            } ),
            invalidatesTags: [ 'SeatType' ]
        } ),
        deleteSeatType: builder.mutation<SeatType[], string | number>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'SeatType' ],
        } ),
    } )

} )

export const { useAddSeatTypeMutation, useGetSeatTypeListQuery, useDeleteSeatTypeMutation, useEditSeatTypeMutation, useGetSeatTypeQuery } = seattypeApi    