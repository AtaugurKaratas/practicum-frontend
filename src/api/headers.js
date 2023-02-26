import axios from "axios"

export const AuthorizationwithJwtToken = () => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`}
};

export const changeLanguage = language => { 
    axios.defaults.headers['accept-language'] = language;
};