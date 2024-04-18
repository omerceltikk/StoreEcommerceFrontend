import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchGetMethod } from "../FetchServices";
export const fetchProductsData = createAsyncThunk("products/getProducts", async () => {
    const res = FetchGetMethod("products") ;
    return res;
});

export const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        status: "idle",
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsData.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.products = action.payload;
            })
            .addCase(fetchProductsData.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchProductsData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
