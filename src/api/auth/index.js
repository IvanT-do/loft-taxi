import axios from "axios";

export const login = (data) => {
    return axios.post("/auth", data);
}

export const register = (data) => {
    return axios.post("/register", data);
}