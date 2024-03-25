import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Cinema } from './cinemas.interface';

export const cinemasApi = createApi( {
    reducerPath: 'cinemasApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://127.0.0.1:8000/api/cinema'
    } ),
    tagTypes: [ 'Cinema' ],
    endpoints: ( builder ) => ( {
        getCinemaList: builder.query( {
            query: () => ``,
            providesTags: [ 'Cinema' ]
        } ),
        getCinema: builder.query( {
            query: ( id: string | number ) => ( {
                url: `/${ id }`,
                method: 'GET',
            } ),
            providesTags: [ 'Cinema' ]
        } ),
        addCinema: builder.mutation<Cinema[], Cinema>( {
            query: ( cinema ) => ( {
                url: ``,
                method: 'POST',
                body: cinema
            } ),
            invalidatesTags: [ 'Cinema' ]
        } ),
        editCinema: builder.mutation<Cinema[], Cinema>( {
            query: ( cinema ) => ( {
                url: `/${ cinema.id }`,
                method: 'PATCH',
                body: cinema
            } ),
            invalidatesTags: [ 'Cinema' ]
        } ),
        deleteCinema: builder.mutation<Cinema[], string | number>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Cinema' ],
        } ),
        getCinemaProduct: builder.query( {
            query: ( id: string ) =>
            {
                console.log( id );
                return {
                    url: `/getproduct/${ id }`,
                    method: "GET"
                }
            },
            providesTags: [ 'Cinema' ]
        } )
    } )

} )

export const { useAddCinemaMutation, useGetCinemaListQuery, useGetCinemaProductQuery, useDeleteCinemaMutation, useEditCinemaMutation, useGetCinemaQuery } = cinemasApi    