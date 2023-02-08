import axios from "axios"

export const registerCustomer = (registerBody) => {
    return axios.post('/api/v1/auth/customer/register', registerBody)
};

export const loginCustomer = (loginBody) => {
    return axios.post('/api/v1/auth/customer/login', loginBody).then((response) => {
        if(response.data.token){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    });
};

export const changeLanguage = language => { 
    axios.defaults.headers['accept-language'] = language;
}

export const bearerToken = () => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
}