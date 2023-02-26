import axios from "axios"
import { AuthorizationwithJwtToken } from "./headers";

export const getGuaranteeList = (customerId) => {
    AuthorizationwithJwtToken();
    return axios.get('/api/v1/guarantee/' + customerId);
};

export const getGuaranteeAsset = (customerAssetId) => {
    AuthorizationwithJwtToken();
    return axios.get('/api/v1/guarantee/customer/' + customerAssetId);
};

export const updateGuarantee = (updateGuaranteeRequest) => {
    AuthorizationwithJwtToken();
    return axios.put('/api/v1/guarantee/update', updateGuaranteeRequest);
};