import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchGetMethod } from "../FetchServices";

export const fetchBasketData = createAsyncThunk("basket/getBasket", async (url) => {
    const res = FetchGetMethod(url) ;
    return res;
});

export const basketsSlice = createSlice({
    name: "baskets",
    initialState: {
        baskets: [],
        status: "idle",
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBasketData.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.baskets = action.payload;
            })
            .addCase(fetchBasketData.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchBasketData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {} = basketsSlice.actions;

export default basketsSlice.reducer;
