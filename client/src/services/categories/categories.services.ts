import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Category } from './categories.interface';

export const categoryApi = createApi( {
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery( {
        baseUrl: 'http://127.0.0.1:8000/api/category'
    } ),
    tagTypes: [ 'Category' ],
    endpoints: ( builder ) => ( {
        getCategoryList: builder.query( {
            query: () => ``,
            providesTags: [ 'Category' ]
        } ),
        getCategory: builder.query( {
            query: ( id: string | number ) => ( {
                url: `/${ id }`,
                method: 'GET',
            } ),
            providesTags: [ 'Category' ]
        } ),
        addCategory: builder.mutation<Category[], Category>( {
            query: ( category ) => ( {
                url: ``,
                method: 'POST',
                body: category
            } ),
            invalidatesTags: [ 'Category' ]
        } ),
        editCategory: builder.mutation<Category[], Category>( {
            query: ( category ) => ( {
                url: `/${ category.id }`,
                method: 'PATCH',
                body: category
            } ),
            invalidatesTags: [ 'Category' ]
        } ),
        deleteCategory: builder.mutation<Category[], string | number>( {
            query: ( id ) => ( {
                url: `/${ id }`,
                method: 'DELETE',
            } ),
            invalidatesTags: [ 'Category' ],
        } ),
        getCategoryProduct: builder.query( {
            query: ( id: string ) =>
            {
                console.log( id );
                return {
                    url: `/getproduct/${ id }`,
                    method: "GET"
                }
            },
            providesTags: [ 'Category' ]
        } )
    } )

} )

export const { useAddCategoryMutation, useGetCategoryListQuery, useGetCategoryProductQuery, useDeleteCategoryMutation, useEditCategoryMutation, useGetCategoryQuery } = categoryApi    