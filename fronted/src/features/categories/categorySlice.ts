import { createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types";
import { fetchCategories, fetchOneCategory } from "./categoryThunks";

interface categoriesState {
  categories: Category[];
  singleCategory: Category | null;
  loading: boolean;
  error: boolean;
}
const initialState: categoriesState = {
  categories: [],
  singleCategory: null,
  loading: false,
  error: false,
};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, { payload: categories }) => {
        state.loading = false;
        state.categories = categories;
      }
    );
    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchOneCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchOneCategory.fulfilled,
      (state, { payload: category }) => {
        state.loading = false;
        state.singleCategory = category;
      }
    );
    builder.addCase(fetchOneCategory.rejected, (state) => {
      state.loading = false;
    });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectOneCategory: (state) => state.singleCategory,
    selectCategoryLoading: (state) => state.loading,
    selectCategoryError: (state) => state.error,
  },
});
export const categoriesReducer = categoriesSlice.reducer;
export const {
  selectCategories,
  selectOneCategory,
  selectCategoryLoading,
  selectCategoryError,
} = categoriesSlice.selectors;
