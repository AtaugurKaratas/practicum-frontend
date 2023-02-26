import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getCustomerCreditRating, updateCustomerCreditRating } from '../../api/creditService';
import Input from '../../components/Input';

const CustomerCreditRatingUpdate = (props) => {
    const { t } = props;
    const { identityNumber } = useParams();
    const [id, setCustomerCreditRatingId] = useState();
    const [creditProductPaymentHabitScore, setCreditProductPaymentHabitScore] = useState('');
    const [currentAccountAndDebitStatusScore, setCurrentAccountAndDebitStatusScore] = useState('');
    const [newCreditProductLaunchesScore, setNewCreditProductLaunchesScore] = useState('');
    const [creditUsageIntensityScore, setCreditUsageIntensityScore] = useState('');
    const [customerNameSurname, setCustomerNameSurname] = useState('');
    const [success, setSuccess] = useState(true);
    const [failed, setFailed] = useState(true);

    const successAlert = () => {
        setSuccess(true);
    }

    const failedAlert = () => {
        setFailed(true);
    }

    useEffect(() => {
        const value = async () => {
            try {
                await getCustomerCreditRating(identityNumber).then((resp) => {
                    const { id, creditProductPaymentHabitScore, currentAccountAndDebitStatusScore,
                        newCreditProductLaunchesScore, creditUsageIntensityScore,
                        customerName, customerSurname } = resp.data;
                    setCustomerCreditRatingId(id);
                    setCreditProductPaymentHabitScore(creditProductPaymentHabitScore);
                    setCurrentAccountAndDebitStatusScore(currentAccountAndDebitStatusScore);
                    setNewCreditProductLaunchesScore(newCreditProductLaunchesScore);
                    setCreditUsageIntensityScore(creditUsageIntensityScore);
                    setCustomerNameSurname(customerName + ' ' + customerSurname);
                });
            }
            catch (error) {
                console.log(error)
            }
        }
        value()
    }, []);

    const updateCreditRating = async (event) => {
        event.preventDefault();
        const customerCreditRatingRequest = {
            id,
            creditProductPaymentHabitScore,
            currentAccountAndDebitStatusScore,
            newCreditProductLaunchesScore,
            creditUsageIntensityScore
        }
        console.log(customerCreditRatingRequest);
        try {
            await updateCustomerCreditRating(customerCreditRatingRequest);
            setSuccess(false);
            setTimeout(successAlert, 3000)
        } catch (error) {
            console.log(error);
            setFailed(false);
            setTimeout(failedAlert, 3000)
        }
    }

    return (
        <div className='container mt-5'>
            <form className='form-group bg-light rounded'>
                <h1 className='text-center'>{t('Customer Credit Rating Update')}</h1>
                <Input label={t('Customer Name & Surname')} name="customerNameSurname" id="customerNameSurname"
                    type="text" value={customerNameSurname} disabled={true} />

                <Input label={t('Credit Product Payment Habit Score')} name="creditProductPaymentHabitScore" id="creditProductPaymentHabitScore"
                    type="text" value={creditProductPaymentHabitScore} onChange={(event) => setCreditProductPaymentHabitScore(event.target.value)} />

                <Input label={t('Current Account And Debit Status Score')} name="currentAccountAndDebitStatusScore" id="currentAccountAndDebitStatusScore"
                    type="text" value={currentAccountAndDebitStatusScore} onChange={(event) => setCurrentAccountAndDebitStatusScore(event.target.value)} />

                <Input label={t('New Credit Product Launches Score')} name="newCreditProductLaunchesScore" id="newCreditProductLaunchesScore"
                    type="text" value={newCreditProductLaunchesScore} onChange={(event) => setNewCreditProductLaunchesScore(event.target.value)} />

                <Input label={t('Credit Usage Intensity Score')} name="creditUsageIntensityScore" id="creditUsageIntensityScore"
                    type="text" value={creditUsageIntensityScore} onChange={(event) => setCreditUsageIntensityScore(event.target.value)} />

                <div className="text-center">
                    <button className="btn btn-primary m-3" onClick={updateCreditRating}>{t('Update')}</button>
                </div>
                <div className="alert alert-danger text-center" role="alert" hidden={failed}>{t('An Error Was Encountered During The Operation')}</div>
                <div className="alert alert-success text-center" role="alert" hidden={success}>{t('The Operations Are Successful')}</div>
            </form>
        </div>
    )
}

export default withTranslation()(CustomerCreditRatingUpdate);