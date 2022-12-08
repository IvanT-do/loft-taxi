import axios from "axios";

export const fetch = (token) => {
    return axios.get("/card", { params: { token } });
}

export const save = (data, token) => {
    return axios.post("/card", { ...data, token });
}