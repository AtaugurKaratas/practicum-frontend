import React, { useState } from "react";
import { addNewCustomer } from '../../api/authService';
import Input from '../../components/Input';
import { withTranslation } from "react-i18next";

const RegisterPage = (props) => {
    const [form, setForm] = useState({
        identityNumber: null,
        email: null,
        password: null,
        passwordRepeat: null,
    });
    const [waitingApiCall, setWaitingApiCall] = useState(false);
    const [errorList, setErrorList] = useState({});
    const [success, setSuccess] = useState(true);
    const t = props.t;

    const successMessage = () => {
        setSuccess(true);
    }

    const onChange = event => {
        const { name, value } = event.target;

        setErrorList((previousError) => ({ ...previousError, [name]: undefined }));
        setForm((previousForm) => ({ ...previousForm, [name]: value }));
    };

    const onClickRegister = async event => {
        event.preventDefault();
        const { identityNumber, email, password } = form;
        const authRegisterRequest = {
            identityNumber,
            email,
            password
        };
        setWaitingApiCall(true);
        try {
            await addNewCustomer(authRegisterRequest);
            setTimeout(successMessage, 3000)
            setSuccess(false);
        } catch (error) {
            if (error.response.data.validationErrors) {
                setErrorList(error.response.data.validationErrors);
            }
        }
        setWaitingApiCall(false);

    };

    let passwordRepeatError;
    if (form.password !== form.passwordRepeat) {
        passwordRepeatError = t('Password Mismatch');
    }

    return (
        <div className="container">
            <form className="form-group bg-light rounded">
                <h1 className="text-center mt-5">{t('Customer Register')}</h1>
                <Input label={t('Identity Number')} name="identityNumber" id="identityNumber" type="text" onChange={onChange} error={errorList.identityNumber} />
                <Input label={t('Email')} name="email" id="email" type="email" onChange={onChange} error={errorList.email} />
                <Input label={t('Password')} name="password" id="password" type="password" onChange={onChange} error={errorList.password} />
                <Input label={t('Password Repeat')} name="passwordRepeat" id="passwordRepeat" type="password" onChange={onChange} error={passwordRepeatError} />
                <div className="text-center">
                    <button className="btn btn-primary m-3" onClick={onClickRegister} disabled={waitingApiCall}>{t('Register')}</button>
                </div>
                <div className="alert alert-success text-center" role="alert" 
                hidden={success}>{t('Verification code has been sent to your e-mail address')}</div>
            </form>
        </div>
    )
}

export default withTranslation()(RegisterPage);