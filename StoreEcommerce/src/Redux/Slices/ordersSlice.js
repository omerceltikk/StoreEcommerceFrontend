import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchGetMethod } from "../FetchServices";
export const fetchOrdersData = createAsyncThunk("orders/getOrders", async (url) => {
    const res = FetchGetMethod(url) ;
    return res;
});

export const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        status: "idle",
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersData.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.orders = action.payload;
            })
            .addCase(fetchOrdersData.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchOrdersData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {} = ordersSlice.actions;

export default ordersSlice.reducer;
