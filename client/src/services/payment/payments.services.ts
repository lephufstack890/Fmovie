import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Payment } from './payments.interface';

export const paymentApi = createApi( {
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://127.0.0.1:8000/api'
    } ),
    tagTypes: [ 'Payment' ],
    endpoints: ( builder ) => ( {
        getPaymentList: builder.query( {
            query: () => `/get_all_transaction`,
            providesTags: [ 'Payment' ]
        } ),
        getPayment: builder.query({
            query: (user_id: string | number) => ({
                url: `/get_transaction/${user_id}`,
                method: "GET",
            }),
            providesTags: [ 'Payment' ]
        }),
        payment: builder.mutation<void, any>( {
            query: ( payment ) => ( {
                url: `/payment`,
                method: 'POST',
                body: payment
            } ),
        } ),
        vnpayCallback: builder.mutation<Payment[], Payment>( {
            query: ( payment ) => ( {
                url: `/vnpay/callback`,
                method: 'POST',
                body: payment
            } ),
            invalidatesTags: [ 'Payment' ]
        } ),
        deletePayment: builder.mutation<Payment[], string | number>( {
            query: ( id ) => ( {
                url: `/delete_transaction/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Payment' ],
        } ),
    } )
} )

export const { useGetPaymentListQuery, useGetPaymentQuery, usePaymentMutation, useVnpayCallbackMutation, useDeletePaymentMutation } = paymentApi    