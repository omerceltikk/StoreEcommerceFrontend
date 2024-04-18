import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FetchPostMethod } from "../FetchServices";

export const fetchUserData = createAsyncThunk("users/getUsers", async (url,body) => {
    const res = FetchPostMethod(url,body) ;
    return res;
});

export const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: JSON.parse(localStorage.getItem("user")) ? [JSON.parse(localStorage.getItem("user"))] : [],
        status: "idle",
        error: null,
    },
 
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.users = action.payload;
            })
            .addCase(fetchUserData.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
