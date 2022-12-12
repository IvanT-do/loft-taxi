import {configureStore} from "@reduxjs/toolkit";
import mainReducer from "./mainSlice";
import orderReducer from "./orderSlice";

export default configureStore({
    reducer:{
        main: mainReducer,
        order: orderReducer
    }
});
