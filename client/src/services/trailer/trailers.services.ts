import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Trailer } from './trailers.interface';

export const trailerApi = createApi({
    reducerPath: "trailerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/trailers",
    }),
    tagTypes: ["Trailer"],
    endpoints: (builder) => ({
        getTrailerList: builder.query({
            query: () => ``,
            providesTags: ["Trailer"],
        }),
        getTrailer: builder.query({
            query: (id: string | number) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: [ 'Trailer' ]
        }),
        addTrailer: builder.mutation<Trailer[], Trailer>( {
            query: ( trailer ) => ( {
                url: ``,
                method: 'POST',
                body: trailer
            } ),
            invalidatesTags: [ 'Trailer' ]
        } ),
        editTrailer: builder.mutation<Trailer[], Trailer>( {
            query: ( trailer ) => ( {
                url: `/${ trailer.id }`,
                method: 'PATCH',
                body: trailer
            } ),
            invalidatesTags: [ 'Trailer' ]
        } ),
        deleteTrailer: builder.mutation<Trailer[], string | number>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Trailer' ],
        } ),
    }),
});

export const { useAddTrailerMutation, useGetTrailerListQuery, useDeleteTrailerMutation, useEditTrailerMutation, useGetTrailerQuery } = trailerApi    
