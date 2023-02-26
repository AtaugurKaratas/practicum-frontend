import axios from "axios"
import { AuthorizationwithJwtToken } from "./headers";

export const creditSave = (creditRequest) => {
    AuthorizationwithJwtToken();
    return axios.post('/api/v1/credit/save', creditRequest)
};

export const getCreditValues = () => {
    AuthorizationwithJwtToken();
    return axios.get('/api/v1/credit/calculation-credit');
};

export const currentCreditRating = (creditRatingDto) => {
    AuthorizationwithJwtToken();
    return axios.post('/api/v1/credit/credit-rating', creditRatingDto);
};

export const getAllCredits = () => {
    AuthorizationwithJwtToken();
    return axios.get('/api/v1/credit/credit-list');
};

export const getCredit = (creditId) => {
    AuthorizationwithJwtToken();
    return axios.get('/api/v1/credit/' + creditId);
};

export const calculationCredit = (creditCalculationRequest) => {
    AuthorizationwithJwtToken();
    return axios.put('/api/v1/credit/calculation-credit', creditCalculationRequest);
};

export const getCreditResult = (creditResultRequest) => {
    return axios.post('/api/v1/credit/credit-result', creditResultRequest);
};

export const getCustomerCreditRating = (identityNumber) => {
    AuthorizationwithJwtToken();
    return axios.get('/api/v1/credit/customer-credit-rating/' + identityNumber);
};

export const updateCustomerCreditRating = (customerCreditRatingRequest) => {
    AuthorizationwithJwtToken();
    return axios.put('/api/v1/credit/customer-credit-rating', customerCreditRatingRequest);
};