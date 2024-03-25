import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, CategoryState } from "./categories.interface";

const initialState: CategoryState = {
    categories: []
}

const categorySlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        addNewCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload)
        },
        loadCategoryList: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload
        },
        editNewCategory: (state, action: PayloadAction<Category>) => {
            const newCategory = action.payload
            state.categories = state.categories.map((category) => category.id === newCategory.id ? newCategory : category)
        },
        deleteCategory: (state, action: PayloadAction<string | number>) => {
            state.categories = state.categories.filter((category) => category.id !== action.payload)
        }

        }
})

export const { addNewCategory, loadCategoryList, editNewCategory, deleteCategory } = categorySlice.actions
export default categorySlice.reducer