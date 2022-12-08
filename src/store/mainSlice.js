import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
    loggedIn: false,
    token: "",
    error: "",
    loading: false
}

const logInReducer = (state, {payload}) => {
    state.loading = false;
    if(payload.success){
        state.error = "";
        state.token = payload.token;
        state.loggedIn = true;
        localStorage.setItem("token", payload.token);
    }
    else{
        state.error = payload.error;
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.loggedIn = false;
            state.token = "";
            localStorage.removeItem("token");
        },
        initAuth: (state) => {
            console.log("init");
            if(!state.loggedIn){
                const token = localStorage.getItem("token");
                if(token){
                    state.token = token;
                    state.loggedIn = true;
                }
            }
        }
    },
    extraReducers: builder => {
        const setLoading = value => state => { state.loading = value };
        builder
            .addCase(authAsync.pending, setLoading(true))
            .addCase(authAsync.rejected, setLoading(false))
            .addCase(authAsync.fulfilled, logInReducer)
            .addCase(registerAsync.pending, setLoading(true))
            .addCase(registerAsync.rejected, setLoading(false))
            .addCase(registerAsync.fulfilled, logInReducer)
    }
});

export const {
    logout,
    initAuth
} = authSlice.actions;

export default authSlice.reducer;

export const userIsLogged = (state) => state.auth.loggedIn;

export const authAsync = createAsyncThunk(
    "auth/login",
    async (authData) => {
        const {data} = await api.auth.login(authData);
        return data;
    }
)

export const registerAsync = createAsyncThunk(
    "auth/register",
    async ({name: fullName, ...other}) => {
        const [name, surname] = fullName.split(" ");
        const { data } = await api.auth.register({ ...other, name, surname });
        return data;
    }
)