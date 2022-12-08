import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    card: {
        cardName: "",
        expiryDate: "",
        cardNumber: "",
        cvc: ""
    }
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: builder => {

    }
})

export default profileSlice.reducer;

export