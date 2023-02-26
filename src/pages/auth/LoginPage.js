import React, { useState } from "react";
import Input from '../../components/Input';
import { authenticateAndGetToken } from '../../api/authService';
import { getCustomerforLocalStorage } from '../../api/customerService';
import { AuthorizationwithJwtToken } from '../../api/headers';
import { Link, useNavigate } from 'react-router-dom';
import { withTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_EMPLOYEE } from "../../redux/actions/actionTypes";
import { user_role } from "../../redux/actions/rolesSlice";

const LoginPage = (props) => {

    const [identityNumber, setIdentityNumber] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const errorAlert = () => {
        setError(true);
    }

    const onClickLogin = async event => {
        event.preventDefault();
        const authLoginRequest = {
            identityNumber,
            password
        };
        try {
            await authenticateAndGetToken(authLoginRequest).then(() => {
                AuthorizationwithJwtToken();
                if (localStorage.getItem('user')) {
                    const roles = JSON.parse(localStorage.getItem('user')).role;
                    if (roles.includes('ROLE_ADMIN')) {
                        dispatch(user_role(ROLE_ADMIN));
                        navigate('/admin/information');
                    }
                    else if (roles.includes('ROLE_EMPLOYEE')) {
                        dispatch(user_role(ROLE_EMPLOYEE));
                        navigate('/employee/information');
                    }
                    else if (roles.includes('ROLE_CUSTOMER')) {
                        dispatch(user_role(ROLE_CUSTOMER));
                        getCustomerforLocalStorage(JSON.parse(localStorage.getItem('user')).id)
                        navigate('/customer/information');
                    }
                }
            })
        } catch (error) {
            setError(false);
            setTimeout(errorAlert, 3000)
        };
    };


    const { waitingApiCall, t } = props;
    return (
        <div className="container">
            <form className="form-group bg-light rounded">
                <h1 className="text-center mt-5">{t('User Login')}</h1>
                <Input label={t('Identity Number')} name="identityNumber" id="identityNumber" type="text" onChange={(event) => { setIdentityNumber(event.target.value) }} />
                <Input label={t('Password')} name="password" id="password" type="password" onChange={(event) => { setPassword(event.target.value) }} />
                <div className="text-center">
                    <button className="btn btn-primary m-3" onClick={onClickLogin} disabled={waitingApiCall}>{t('Login')}</button>
                    <Link className="nav-link text-end me-5" to="/forgottenPassword">{t('Forgotten Password')}</Link>
                </div>
                <div className="alert alert-danger text-center" role="alert" hidden={error}>{t('The Login Process Failed')}</div>
            </form>
        </div>
    )
};

export default withTranslation()(LoginPage);