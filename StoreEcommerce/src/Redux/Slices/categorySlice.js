import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchGetMethod } from "../FetchServices";

export const fetchData = createAsyncThunk("categories/getCategories", async () => {
    const res = FetchGetMethod("categories") ;
    return res;
});

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        status: "idle",
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.categories = action.payload;
            })
            .addCase(fetchData.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;
