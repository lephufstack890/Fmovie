import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Room } from './rooms.interface';

export const roomApi = createApi({
    reducerPath: "roomsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/rooms",
    }),
    tagTypes: ["Room"],
    endpoints: (builder) => ({
        getRoomList: builder.query({
            query: () => ``,
            providesTags: ["Room"],
        }),
        getRoom: builder.query({
            query: (id: string | number) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: [ 'Room' ]
        }),
        addRoom: builder.mutation<Room[], Room>( {
            query: ( room ) => ( {
                url: ``,
                method: 'POST',
                body: room
            } ),
            invalidatesTags: [ 'Room' ]
        } ),
        editRoom: builder.mutation<Room[], Room>( {
            query: ( room ) => ( {
                url: `/${ room.id }`,
                method: 'PATCH',
                body: room
            } ),
            invalidatesTags: [ 'Room' ]
        } ),
        deleteRoom: builder.mutation<Room[], string | number>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Room' ],
        } ),
    }),
});

export const { useAddRoomMutation, useGetRoomListQuery, useDeleteRoomMutation, useEditRoomMutation, useGetRoomQuery } = roomApi    
