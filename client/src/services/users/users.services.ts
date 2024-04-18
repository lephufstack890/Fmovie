import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './users.interface';

export const userApi = createApi( {
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://127.0.0.1:8000/api/users'
    } ),
    tagTypes: [ 'User' ],
    endpoints: ( builder ) => ( {
        getUserList: builder.query( {
            query: () => ``,
            providesTags: [ 'User' ]
        } ),
        getUser: builder.query( {
            query: ( id: string | number ) => ( {
                url: `/${ id }`,
                method: 'GET',
            } ),
            providesTags: [ 'User' ]
        } ),
        deleteUser: builder.mutation<User[], string | number>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'User' ],
        } ),
    } )
} )

export const { useGetUserListQuery, useDeleteUserMutation, useGetUserQuery } = userApi    