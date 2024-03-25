import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Payment } from './payments.interface';

export const paymentApi = createApi( {
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://127.0.0.1:8000/api/payment/vnpay'
    } ),
    tagTypes: [ 'Payment' ],
    endpoints: ( builder ) => ( {
        addPayment: builder.mutation<Payment[], Payment>( {
            query: ( payment ) => ( {
                url: ``,
                method: 'POST',
                body: payment
            } ),
            invalidatesTags: [ 'Payment' ]
        } ),
    } )
} )

export const { useAddPaymentMutation } = paymentApi    