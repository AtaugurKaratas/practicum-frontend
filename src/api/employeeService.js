import axios from "axios"
import { AuthorizationwithJwtToken } from "./headers";



export const updateEmployeeInfo = (employeeUpdateRequest) => {
    AuthorizationwithJwtToken()
    return axios.put('/api/v1/employee/employee-info-update', employeeUpdateRequest);
};

export const getEmployee = (authId) => {
    AuthorizationwithJwtToken();
    getEmployeeforLocalStorage(authId);
    return axios.get(`/api/v1/employee/` + authId);
};

export const getEmployeeforLocalStorage = (authId) => {
    AuthorizationwithJwtToken()
    return axios.get(`/api/v1/employee/` + authId).then((resp) => {
        localStorage.setItem("employee", JSON.stringify(resp.data));
        return resp.data;
    });
};