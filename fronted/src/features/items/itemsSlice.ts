import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../types";
import { fetchByCategory, fetchItems, fetchOneItem } from "./itemsThunks";

interface itemsState {
  items: Item[];
  singleItem: Item | null;
  loading: boolean;
  error: boolean;
}
const initialState: itemsState = {
  items: [],
  singleItem: null,
  loading: false,
  error: false,
};
export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchItems.fulfilled, (state, { payload: items }) => {
      state.loading = false;
      state.items = items;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchOneItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOneItem.fulfilled, (state, { payload: item }) => {
      state.loading = false;
      state.singleItem = item;
    });
    builder.addCase(fetchOneItem.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchByCategory.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchByCategory.fulfilled, (state, { payload: items }) => {
      state.loading = false;
      state.items = items;
    });
    builder.addCase(fetchByCategory.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
  selectors: {
    selectItems: (state) => state.items,
    selectOneItem: (state) => state.singleItem,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error,
  },
});
export const itemsReducer = itemsSlice.reducer;
export const { selectItems, selectOneItem, selectLoading, selectError } =
  itemsSlice.selectors;
