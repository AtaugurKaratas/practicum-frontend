import axios from "axios"
import { AuthorizationwithJwtToken } from "./headers";

export const saveEmployee = (authEmployeeRegister) => {
    AuthorizationwithJwtToken();
    return axios.post('/api/v1/admin/employee/save', authEmployeeRegister)
};

export const saveAdmin = (authAdminRegister) => {
    AuthorizationwithJwtToken();
    return axios.post('/api/v1/admin/save', authAdminRegister)
};

export const updateAdminInfo = (adminInfoUpdateRequest) => {
    AuthorizationwithJwtToken()
    return axios.put('/api/v1/admin/admin-info-update', adminInfoUpdateRequest);
};

export const getAdmin = (authId) => {
    AuthorizationwithJwtToken();
    getAdminforLocalStorage(authId);
    return axios.get(`/api/v1/admin/` + authId);
};

export const getAdminforLocalStorage = (authId) => {
    AuthorizationwithJwtToken()
    return axios.get(`/api/v1/admin/` + authId).then((resp) => {
        localStorage.setItem("admin", JSON.stringify(resp.data));
        return resp.data;
    });
};