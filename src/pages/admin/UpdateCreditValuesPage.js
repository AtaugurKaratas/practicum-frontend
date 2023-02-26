import React, { useState, useEffect } from 'react'
import Input from '../../components/Input';
import { getCreditValues, currentCreditRating } from '../../api/creditService';
import { withTranslation } from 'react-i18next';


const UpdateCreditValuesPage = (props) => {
    const { t } = props;
    const [creditProductPaymentHabits, setCreditProductPaymentHabits] = useState('');
    const [currentAccountAndDebitStatus, setCurrentAccountAndDebitStatus] = useState('');
    const [newCreditProductLaunches, setNewCreditProductLaunches] = useState('');
    const [creditUsageIntensity, setCreditUsageIntensity] = useState('');
    const [creditScoreStartingValue, setCreditScoreStartingValue] = useState('');
    const [success, setSuccess] = useState(true);
    const [failed, setFailed] = useState(true);

    const successAlert = () => {
        setSuccess(true);
    }

    const failedAlert = () => {
        setFailed(true);
    }

    useEffect(() => {
        const creditValues = async () => {
            try {
                await getCreditValues().then((resp) => {
                    const creditRatings = resp.data
                    setCreditProductPaymentHabits(creditRatings.creditProductPaymentHabits)
                    setCurrentAccountAndDebitStatus(creditRatings.currentAccountAndDebitStatus)
                    setNewCreditProductLaunches(creditRatings.newCreditProductLaunches)
                    setCreditUsageIntensity(creditRatings.creditUsageIntensity)
                    setCreditScoreStartingValue(creditRatings.creditScoreStartingValue)
                })
            } catch (error) {
                console.log(error)
            }
        }
        creditValues()
    }, []);

    const onClick = async event => {
        event.preventDefault();
        const creditRatingDto = {
            creditProductPaymentHabits,
            currentAccountAndDebitStatus,
            newCreditProductLaunches,
            creditUsageIntensity,
            creditScoreStartingValue
        }
        try {
            await currentCreditRating(creditRatingDto);
            setSuccess(false);
            setTimeout(successAlert, 3000)
        } catch (error) {
            console.log(error)
            setFailed(false);
            setTimeout(failedAlert, 3000)
        }
    }

    return (
        <div className='container mt-5'>
            <form className='form-group bg-light rounded'>
                <h1 className='text-center'>{t('Change Credit System')}</h1>
                <Input label={t('Credit Product Payment Habits')} value={creditProductPaymentHabits} name="creditProductPaymentHabits"
                    id="creditProductPaymentHabits" type="text" onChange={(event) => setCreditProductPaymentHabits(event.target.value)} />
                <Input label={t('Current Account And Debit Status')} value={currentAccountAndDebitStatus} name="currentAccountAndDebitStatus"
                    id="currentAccountAndDebitStatus" type="text" onChange={(event) => setCurrentAccountAndDebitStatus(event.target.value)} />
                <Input label={t('New Credit Product Launches')} value={newCreditProductLaunches} name="newCreditProductLaunches"
                    id="newCreditProductLaunches" type="text" onChange={(event) => setNewCreditProductLaunches(event.target.value)} />
                <Input label={t('Credit Usage Intensity')} value={creditUsageIntensity} name="creditUsageIntensity"
                    id="creditUsageIntensity" type="text" onChange={(event) => setCreditUsageIntensity(event.target.value)} />
                <Input label={t('Credit Score Starting Value')} value={creditScoreStartingValue} name="creditScoreStartingValue"
                    id="creditScoreStartingValue" type="text" onChange={(event) => setCreditScoreStartingValue(event.target.value)} />
                <div className="text-center">
                    <button className="btn btn-primary m-3" onClick={onClick}>{t('Update')}</button>
                </div>
                <div className="alert alert-danger text-center" role="alert" hidden={failed}>{t('An Error Was Encountered During The Operation')}</div>
                <div className="alert alert-success text-center" role="alert" hidden={success}>{t('The Operations Are Successful')}</div>
            </form>
        </div>
    )
}

export default withTranslation()(UpdateCreditValuesPage); 