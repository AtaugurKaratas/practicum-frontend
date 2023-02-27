import React, { useState, useEffect } from 'react'
import Input from '../../components/Input';
import { getGuaranteeAsset, updateGuarantee } from '../../api/guaranteeService';
import { useLocation } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

const CreditGuarantee = (props) => {
    const { t } = props;
    const [guaranteeId, setGuaranteeId] = useState('');
    const [customerNameSurname, setCustomerNameSurname] = useState('');
    const [customerPrice, setCustomerPrice] = useState('');
    const location = useLocation();
    const [success, setSuccess] = useState(true);
    const [failed, setFailed] = useState(true);

    const successAlert = () => {
        setSuccess(true);
    }

    const failedAlert = () => {
        setFailed(true);
    }

    useEffect(() => {
        const guaranteeFunction = async () => {
            try {
                await getGuaranteeAsset(location.state.id).then((resp) => {
                    const guaranteeResponse = resp.data
                    console.log(resp.data)
                    setGuaranteeId(guaranteeResponse.id)
                    setCustomerNameSurname(guaranteeResponse.customerName + " " + guaranteeResponse.customerSurname)
                    setCustomerPrice(guaranteeResponse.guaranteeAmount)
                })
            } catch (error) {
                console.log(error)
            }
        }
        guaranteeFunction()
    }, []);

    const onClickConfirm = async (event) => {
        event.preventDefault();
        const updateGuaranteeRequest = {
            guaranteeId,
            approval: true
        }
        try {
            await updateGuarantee(updateGuaranteeRequest)
            setSuccess(false);
            setTimeout(successAlert, 3000)
        } catch (error) {
            console.log(error)
            setFailed(false);
            setTimeout(failedAlert, 3000)
        }
    }

    const onClickRejection = async (event) => {
        event.preventDefault();
        const updateGuaranteeRequest = {
            guaranteeId,
            approval: false
        }
        try {
            await updateGuarantee(updateGuaranteeRequest)
            setSuccess(false);
            setTimeout(successAlert, 3000)
        } catch (error) {
            console.log(error)
            setFailed(false);
            setTimeout(failedAlert, 3000)
        }
    }

    return (
        <div className='container'>
            <h1 className='text-center'>{t('Credit Guarantee')}</h1>
            <form className='form-group'>
                <Input label={t('Customer Name - Surname')} name="customerNameSurname" id="customerNameSurname" type="text" value={customerNameSurname} disabled={true} />
                <Input label={t('Price')} name="customerPrice" id="customerPrice" type="text" value={customerPrice} disabled={true} />
                <div className="text-center">
                    <button className="btn btn-primary m-3" onClick={onClickConfirm}>{t('Confirm')}</button>
                    <button className="btn btn-danger m-3" onClick={onClickRejection}>{t('Rejection')}</button>
                </div>
                <div className="alert alert-danger text-center" role="alert" hidden={failed}>{t('An Error Was Encountered During The Operation')}</div>
                <div className="alert alert-success text-center" role="alert" hidden={success}>{t('The Operations Are Successful')}</div>
            </form>
        </div>
    )
};

export default withTranslation()(CreditGuarantee);