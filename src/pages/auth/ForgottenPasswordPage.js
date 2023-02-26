import React, { useState } from 'react'
import { withTranslation } from 'react-i18next';
import { forgottenPassword } from '../../api/authService';
import Input from '../../components/Input';

const ForgottenPassword = (props) => {
    const [email, setEmail] = useState();
    const [success, setSuccess] = useState(true);
    const [failed, setFailed] = useState(true);

    const successMessage = () => {
        setSuccess(true);
    }

    const failedMessage = () => {
        setFailed(true);
    }

    const onClick = async (event) => {
        event.preventDefault();
        const forgottenPasswordRequest = {
            email
        }
        try {

            await forgottenPassword(forgottenPasswordRequest)
            setTimeout(successMessage, 3000)
            setSuccess(false);
        } catch (error) {
            setTimeout(failedMessage, 3000)
            setFailed(false);
        }
    }

    const { t } = props;
    return (
        <div className='container mt-5'>
            <form className='form-group bg-light rounded mt-5'>
                <h1 className='text-center'>{t('Forgotten Password')}</h1>
                <Input label={t('Email')} name="email" id="email" type="email" onChange={(event) => setEmail(event.target.value)} />
                <div className="text-center">
                    <button id="submit" className="btn btn-primary m-3" onClick={onClick}>{t('Send New Password')}</button>
                </div>
                <div className="alert alert-success text-center" role="alert"
                    hidden={success}>{t('Your new password has been sent to your e-mail address')}</div>
                <div className="alert alert-danger text-center" role="alert"
                    hidden={failed}>{t('Forgotten Password Operation Failed')}</div>
            </form>
        </div>
    )
}

export default withTranslation()(ForgottenPassword);