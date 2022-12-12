import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
    addresses: null,
    addressesLoading: false,
    route: []
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        clearRoute: (state) => {
            state.route = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAddressesAsync.pending, (state, {payload}) => {
                state.addressesLoading = true
            })
            .addCase(fetchAddressesAsync.rejected, (state, {payload}) => {
                state.addressesLoading = false
            })
            .addCase(fetchAddressesAsync.fulfilled, (state, {payload}) => {
                state.addressesLoading = false
                state.addresses = payload;
            })
            .addCase(fetchRouteAsync.fulfilled, (state, {payload}) => {
                state.route = payload;
            })
    }
})

export default orderSlice.reducer;

export const getAddresses = (state) => state.order.addresses || [];
export const addressesIsLoaded = (state) => state.order.addresses !== null;
export const addressesIsLoading = (state) => state.order.addressesLoading;

export const getTargetCoordinates = (state) => state.order.route;

export const fetchAddressesAsync = createAsyncThunk(
    "order/fetchAddresses",
    async () => {
        const { data } = await api.order.fetchAddresses();
        return data.addresses;
    }
)

export const fetchRouteAsync = createAsyncThunk(
    "order/fetchRoute",
    async (formData) => {
        const { data } = await api.order.fetchRoute(formData);
        return data;
    }
);

export const setOrderAsync = createAsyncThunk(
    "order/set",
    async (orderData) => {
        console.log(orderData);
        await new Promise(res => setTimeout(res, 3000));
        return orderData;
    }
)

export const fetchAddressesIfNotLoaded = () => (dispatch, getState) => {
    const state = getState();
    if(!addressesIsLoaded(state) && !addressesIsLoading(state)){
        dispatch(fetchAddressesAsync());
    }
}