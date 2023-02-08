import React from "react";
import { registerCustomer } from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";

class CustomerRegisterPage extends React.Component {
    state = {
        identityNumber: null,
        email: null,
        password: null,
        passwordRepeat: null,
        waitingApiCall: false,
        errorList: {},
    };

    onChange = event => {
        const { name, value } = event.target;
        const errorList = { ...this.state.errorList };
        errorList[name] = undefined;
        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errorList.passwordRepeat = 'Password mismatch';
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errorList.passwordRepeat = 'Password mismatch';
            } else {
                errorList.passwordRepeat = undefined;
            }
        }
        this.setState({
            [name]: value,
            errorList
        });
    };

    onClickRegister = async event => {
        event.preventDefault();
        const { identityNumber, email, password } = this.state;
        const registerBody = {
            identityNumber,
            email,
            password
        };
        this.setState({ waitingApiCall: true });

        try {
            await registerCustomer(registerBody);
        } catch (error) {
            if (error.response.data.validationErrors) {
                this.setState({ errorList: error.response.data.validationErrors });
            }
        }
        this.setState({ waitingApiCall: false });

    };

    render() {
        const { waitingApiCall, errorList } = this.state;
        const { identityNumber, email, password, passwordRepeat } = errorList;
        const { t } = this.props;
        return (
            <div className="container">
                <h1 className="text-center m-3">{t('Customer Register')}</h1>
                <form className="form-group">
                    <Input label={t('Identity Number')} name="identityNumber" id="identityNumber" type="text" onChange={this.onChange} error={identityNumber} />
                    <Input label={t('Email')} name="email" id="email" type="email" onChange={this.onChange} error={email} />
                    <Input label={t('Password')} name="password" id="password" type="password" onChange={this.onChange} error={password} />
                    <Input label={t('Password Repeat')} name="passwordRepeat" id="passwordRepeat" type="password" onChange={this.onChange} error={passwordRepeat} />
                    <div className="text-center">
                        <button className="btn btn-primary m-3" onClick={this.onClickRegister} disabled={waitingApiCall}>{t('Register')}</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withTranslation()(CustomerRegisterPage);