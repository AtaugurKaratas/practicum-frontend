import axios from "axios"

export const addNewCustomer = (authRegisterRequest) => {
    return axios.post('/api/v1/auth/customer/register', authRegisterRequest)
};

export const authenticateAndGetToken = (authLoginRequest) => {
    return axios.post('/api/v1/auth/login', authLoginRequest).then((response) => {
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

export const passwordChange = (changePasswordRequest) => {
    return axios.put('/api/v1/auth/passwordChange', changeForgottenPassword);
};

export const accountActivation = (authId, verifyCode) => {
    return axios.get('/api/v1/auth/' + authId  + "/" + verifyCode);
};

export const forgottenPassword = (forgottenPasswordRequest) => {
    return axios.post('/api/v1/auth/forgottenPassword', forgottenPasswordRequest);
};

export const changeForgottenPassword = (authId, verifyCode) => {
    return axios.get('/api/v1/auth/' + authId + verifyCode);
};


export const deleteUser = (authId) => {
    return axios.delete('/api/v1/auth/delete/' + authId);
};