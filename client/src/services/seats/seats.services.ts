import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Seat } from './seats.interface';

export const seatApi = createApi( {
    reducerPath: 'seatApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://127.0.0.1:8000/api'
    } ),
    tagTypes: [ 'Seat' ],
    endpoints: ( builder ) => ( {
        getSeatList: builder.query( {
            query: ({ page, status }) => ({
                url: `/seats`,
                method: 'GET',
                params: { page, status }, 
            }),
            providesTags: [ 'Seat' ]
        } ),
        getSeat: builder.query( {
            query: ( id: string | number ) => ( {
                url: `/seats/${ id }`,
                method: 'GET',
            } ),
            providesTags: [ 'Seat' ]
        } ),
        addSeat: builder.mutation<Seat[], Seat>( {
            query: ( seat ) => ( {
                url: `/seats`,
                method: 'POST',
                body: seat
            } ),
            invalidatesTags: [ 'Seat' ]
        } ),
        editSeat: builder.mutation<Seat[], Seat>( {
            query: ( seat ) => ( {
                url: `/seats/${ seat.id }`,
                method: 'PATCH',
                body: seat
            } ),
            invalidatesTags: [ 'Seat' ]
        } ),
        deleteSeat: builder.mutation<Seat[], string | number>( {
            query: ( id ) => ( {
                url: `/seats/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Seat' ],
        } ),
        // chooseSeat: builder.mutation<void, string[]>({
        //     query: (id_seat) => ({
        //         url: '/select-seat',
        //         method: 'POST',
        //         body: { id_seat },
        //     }),
        // }),
        chooseSeat: builder.mutation<void, any>({
            query: (data) => ({
                url: '/select-seat',
                method: 'POST',
                body: data,
            }),
        }),
        cancelSeat: builder.mutation<void, any>({
            query: (data) => ({
                url: '/cancel-seat',
                method: 'POST',
                body: data,
            }),
        }),
    } )

} )

export const { useAddSeatMutation, useGetSeatListQuery, useDeleteSeatMutation, useEditSeatMutation, useGetSeatQuery, useChooseSeatMutation, useCancelSeatMutation  } = seatApi    