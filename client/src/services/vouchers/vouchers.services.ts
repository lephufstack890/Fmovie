import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Voucher } from './vouchers.interface';

export const voucherApi = createApi( {
    reducerPath: 'voucherApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://127.0.0.1:8000/api/voucher'
    } ),
    tagTypes: [ 'Voucher' ],
    endpoints: ( builder ) => ( {
        getVoucherList: builder.query( {
            query: () => ``,
            providesTags: [ 'Voucher' ]
        } ),
        getVoucher: builder.query( {
            query: ( id: string | number ) => ( {
                url: `/${ id }`,
                method: 'GET',
            } ),
            providesTags: [ 'Voucher' ]
        } ),
        addVoucher: builder.mutation<Voucher[], Voucher>( {
            query: ( voucher ) => ( {
                url: ``,
                method: 'POST',
                body: voucher
            } ),
            invalidatesTags: [ 'Voucher' ]
        } ),
        editVoucher: builder.mutation<Voucher[], Voucher>( {
            query: ( voucher ) => ( {
                url: `/${ voucher.id }`,
                method: 'PATCH',
                body: voucher
            } ),
            invalidatesTags: [ 'Voucher' ]
        } ),
        deleteVoucher: builder.mutation<Voucher[], string | number>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Voucher' ],
        } ),
    } )
} )

export const { useAddVoucherMutation, useGetVoucherListQuery, useDeleteVoucherMutation, useEditVoucherMutation, useGetVoucherQuery } = voucherApi    