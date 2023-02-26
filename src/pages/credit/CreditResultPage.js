import React, { useState } from 'react'
import { withTranslation } from 'react-i18next'
import Input from '../../components/Input';
import { getCreditResult } from '../../api/creditService';

const CreditResult = (props) => {
    const { t } = props;
    const [identityNumber, setIdentityNumber] = useState();
    const [birthDate, setBirthDate] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [limitValue, setLimitValue] = useState();
    const [responseDate, setResponseDate] = useState();
    const [creditProcess, setCreditProcess] = useState();
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState();
    const [failed, setFailed] = useState(true);

    const failedAlert = () => {
        setFailed(true);
    }

    const onClickSave = async (event) => {
        event.preventDefault();
        const creditResultRequest = {
            identityNumber,
            birthDate
        }
        try {
            await getCreditResult(creditResultRequest).then((resp) => {
                const creditResponse = resp.data
                setName(creditResponse.name);
                setSurname(creditResponse.surname);
                setLimitValue(creditResponse.limitValue);
                setResponseDate(creditResponse.responseDate);
                setCreditProcess(creditResponse.creditProcess);
                setHidden(false);
            });
        } catch (error) {
            setError(error.response.data.message);
            setFailed(false);
            setTimeout(failedAlert, 3000)
        }
    }

    const creditAlert = () => {
        if (creditProcess === 'PENDING') {
            return "alert alert-warning"
        }
        if (creditProcess === 'REJECTION') {
            return "alert alert-danger"
        }
        if (creditProcess === 'CONFIRM') {
            return "alert alert-success"
        }
    }

    const errorAlert = (
        <div className={`text-center alert alert-danger`} hidden={failed} role={alert}>
            {error}
        </div>
    )

    const result = (
        <div className={`text-center ${creditAlert()}`} hidden={hidden} role={alert}>
            <h1>{t(creditProcess)}</h1>
            <Input label={t('Name & Surname')} name="nameAndSurname" id="nameAndSurname"
                type="text" disabled value={name + " " + surname} />
            <Input label={t('Limit Value')} name="limitValue" id="limitValue"
                type="text" disabled value={limitValue} hidden={creditProcess==='CONFIRM' ? false : true}/>
            <Input label={t('Response Date')} name="responseDate" id="responseDate"
                type="date" disabled value={responseDate} hidden={creditProcess==='PENDING' ? true : false}/>
        </div>
    )
    return (
        <div className='container mt-3'>
            <form className='form-group bg-light rounded'>
                <h1 className='text-center'>{t('Credit Results')}</h1>
                <Input label={t('Identity Number')} name="identityNumber" id="identityNumber"
                    type="text" onChange={(event) => setIdentityNumber(event.target.value)} />
                <Input label={t('Birth Date')} name="birthDate" id="birthDate" type="date"
                    onChange={(event) => setBirthDate(event.target.value)} />
                <div className="text-center">
                    <button id="submit" className="btn btn-primary m-3" onClick={onClickSave}>{t('Search')}</button>
                </div>
                {errorAlert}
                {result}
            </form>
        </div>
    )
}

export default withTranslation()(CreditResult);