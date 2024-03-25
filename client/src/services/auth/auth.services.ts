import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api/',
        headers: {
            'Content-Type': 'application/json'
        }
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `login`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Auth']
        }),

        register: builder.mutation({
            query: (data) => ({
                url: `register`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Auth']
        }),

        logout: builder.mutation({
            query: (token) => ({
                url: `logout`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Auth']
        }),

        getUser: builder.mutation({
            query: (token) => ({
                url: `user`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Auth']
        }),

    })

})

export const {useLoginMutation, useRegisterMutation, useLogoutMutation, useGetUserMutation} = authApi