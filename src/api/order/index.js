import axios from "axios";

export const fetchAddresses = () => {
    return axios.get("/addressList");
}

export const fetchRoute = ({from, to}) => {
    return axios.get("/route", {
        params: {
            address1: from,
            address2: to
        }
    })
}