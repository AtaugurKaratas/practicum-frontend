import React, { useState } from "react";
import Input from "../components/Input";
import { bearerToken, loginCustomer } from "../api/apiCalls";
import { useNavigate } from 'react-router-dom';
import { withTranslation } from "react-i18next";

const CustomerLoginPage = (props) => {

    const [identityNumber, setIdentityNumber] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const onClickLogin = async event => {
        event.preventDefault();
        const loginBody = {
            identityNumber,
            password
        };
        try {
            await loginCustomer(loginBody).then(() => {
                bearerToken();
                navigate('/');
            })
        } catch (error) {
            console.log(error.response.data.error);
        };
    };


    const { waitingApiCall, t } = props;
    return (
        <div className="container">
            <h1 className="text-center m-3">{t('Customer Login')}</h1>
            <form className="form-group">
                <Input label={t('Identity Number')} name="identityNumber" id="identityNumber" type="text" onChange={(event) => { setIdentityNumber(event.target.value) }} />
                <Input label={t('Password')} name="password" id="password" type="password" onChange={(event) => { setPassword(event.target.value) }} />
                <div className="text-center">
                    <button className="btn btn-primary m-3" onClick={onClickLogin} disabled={waitingApiCall}>{t('Login')}</button>
                </div>
            </form>
        </div>
    )
};

export default withTranslation()(CustomerLoginPage);