import axios from "axios"
import { AuthorizationwithJwtToken } from "./headers";

export const customerSave = (customerRequest) => {
    AuthorizationwithJwtToken()
    return axios.post('/api/v1/customer/save', customerRequest);
};

export const customerUpdate = (customerUpdateRequest) => {
    AuthorizationwithJwtToken()
    return axios.put('/api/v1/customer/update', customerUpdateRequest);
};

export const getCustomer = (authId) => {
    AuthorizationwithJwtToken();
    getCustomerforLocalStorage(authId);
    return axios.get(`/api/v1/customer/` + authId);
};

export const getCustomerforLocalStorage = (authId) => {
    AuthorizationwithJwtToken()
    return axios.get(`/api/v1/customer/` + authId).then((resp) => {
        localStorage.setItem("customer", JSON.stringify(resp.data));
        return resp.data;
    });
};