import axios from "axios"
import { AuthorizationwithJwtToken } from "./headers";

export const saveCustomerAsset = (customerAssetRequest) => {
    AuthorizationwithJwtToken();
    return axios.post('/api/v1/customer/asset/save', customerAssetRequest);
};

export const getCustomerAssets = (customerId) =>{
    AuthorizationwithJwtToken();
    return axios.get('/api/v1/customer/asset/' + customerId);
};