import axios from "axios";

axios.defaults.baseURL = "https://loft-taxi.glitch.me/";

export * as auth from "./auth";
export * as profile from "./profile";
export * as order from "./order";