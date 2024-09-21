import { createAsyncThunk } from "@reduxjs/toolkit";
import { Item } from "../../types";
import axiosApi from "../../axiosApi";

export const fetchItems = createAsyncThunk<Item[], undefined>(
  "items/fetchAll",
  async () => {
    const response = await axiosApi.get<Item[]>("/items");
    return response.data;
  }
);

export const fetchOneItem = createAsyncThunk<Item, string>(
  "items/fetchOne",
  async (itemId: string) => {
    const response = await axiosApi.get<Item>(`/items/${itemId}`);
    return response.data;
  }
);

export const fetchByCategory = createAsyncThunk<Item[], string>(
  "items/fetchByCategory",
  async (categoryId: string) => {
    const response = await axiosApi.get<Item[]>(
      `/items/category/${categoryId}`
    );
    return response.data;
  }
);