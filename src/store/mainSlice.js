import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
    loggedIn: false,
    token: "",
    error: "",
    loading: false,

    profileLoading: false,
    profileLoaded: false,
    card: {
        cardName: "",
        expiryDate: "",
        cardNumber: "",
        cvc: ""
    }
}

initialState.profileEditor = initialState.card;

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

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        logout: (state) => {
            state.loggedIn = false;
            state.token = "";
            localStorage.removeItem("token");
        },
        initAuth: (state) => {
            if(!state.loggedIn){
                const token = localStorage.getItem("token");
                if(token){
                    state.token = token;
                    state.loggedIn = true;
                }
            }
        },
        setProfileValue: (state, { payload: { name, value } }) => {
            if(state.profileEditor.hasOwnProperty(name)){
                state.profileEditor[name] = value;
            }
        },
        clearProfileChanges: (state) => {
            state.profileEditor = state.card;
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
            .addCase(fetchProfileAsync.pending, (state) => {
                state.profileLoading = true;
            })
            .addCase(fetchProfileAsync.rejected, (state) => {
                state.profileLoading = false;
            })
            .addCase(fetchProfileAsync.fulfilled, (state, { payload }) => {
                state.profileLoading = false;
                state.profileLoaded = true;
                if(!/\d{2}\/\d{2}/.test(payload.expiryDate)){
                    payload.expiryDate = new Date(payload.expiryDate).toLocaleDateString("en-BR", {month: "2-digit", year:"2-digit"});
                }
                state.card = payload;
                state.profileEditor = payload;
            })
            .addCase(saveProfileAsync.fulfilled, (state, { payload }) => {
                if(payload.status === "success"){
                    state.card = state.profileEditor = payload.formData;
                }
            })
    }
});

export const {
    logout,
    initAuth,
    setProfileValue
} = mainSlice.actions;

export default mainSlice.reducer;

export const userIsLogged = (state) => state.main.loggedIn;
export const getToken = (state) => state.main.token;
export const getProfile = (state) => state.main.profileEditor;

export const authAsync = createAsyncThunk(
    "main/login",
    async (authData) => {
        const {data} = await api.auth.login(authData);
        return data;
    }
)

export const registerAsync = createAsyncThunk(
    "main/register",
    async ({name: fullName, ...other}) => {
        const [name, surname] = fullName.split(" ");
        const { data } = await api.auth.register({ ...other, name, surname });
        return data;
    }
)

export const fetchProfileAsync = createAsyncThunk(
    "main/fetchProfile",
    async (nothing, { getState }) => {
        const token = getToken(getState());
        const { data } = await api.profile.fetch(token);
        return data;
    }
)

export const fetchProfileIfNotLoaded = () => (dispatch, getState) => {
    const state = getState().main;
    if(!state.profileLoading && !state.profileLoaded){
        return dispatch(fetchProfileAsync()).unwrap();
    }
    if(!state.profileLoaded){
        return Promise.resolve(null)
    }
    return Promise.resolve(state.card);
}

export const saveProfileAsync = createAsyncThunk(
    "main/saveProfile",
    async (formData, { getState }) => {
        const { data } = await api.profile.save(formData, getToken(getState()));
        return {...data, formData};
    }
)