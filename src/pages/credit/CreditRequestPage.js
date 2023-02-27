import React, { useState } from 'react'
import Input from '../../components/Input';
import { creditSave } from '../../api/creditService';
import { withTranslation } from 'react-i18next';
import Dropdown from '../../components/Dropdown';

const CreditRequestPage = (props) => {
    const { t } = props;
    const [guarantee, setGuarantee] = useState(true);
    const [guaranteeType, setGuaranteeType] = useState('GUARANTEE_CUSTOMER');
    const [form, setForm] = useState({
        customerId: null,
        identityNumber: null,
        birthDate: null,
        guaranteeIdentityNumber: null,
        customerGuaranteePrice: null,
    });
    const [success, setSuccess] = useState(true);
    const [failed, setFailed] = useState(true);

    const successAlert = () => {
        setSuccess(true);
    }

    const failedAlert = () => {
        setFailed(true);
    }

    const onChange = (event) => {
        const { name, value } = event.target;

        setForm((previousForm) => ({ ...previousForm, [name]: value }));
    }

    const onClickLogin = async event => {
        event.preventDefault();
        let index = document.getElementById('customerAssetId');
        let { customerId, identityNumber, birthDate, guaranteeIdentityNumber, customerGuaranteePrice, customerAssetId, assetGuaranteePrice } = form;
        customerId = JSON.parse(localStorage.getItem('customer')).customerId
        if (guarantee === false) {
            guaranteeIdentityNumber = null
            customerGuaranteePrice = null
            customerAssetId = null
            assetGuaranteePrice = null
        } else if (guaranteeType === 'GUARANTEE_CUSTOMER') {
            customerAssetId = null
            assetGuaranteePrice = null
        } else if (guaranteeType === 'GUARANTEE_ASSET') {
            guaranteeIdentityNumber = null
            customerGuaranteePrice = null
            customerAssetId = document.getElementById('customerAssetId').options[index.selectedIndex].id
            assetGuaranteePrice = document.getElementById('assetGuaranteePrice').value
        }
        const creditRequest = {
            customerId,
            identityNumber,
            birthDate,
            guarantee,
            guaranteeIdentityNumber,
            customerGuaranteePrice,
            customerAssetId,
            assetGuaranteePrice

        };
        console.log(creditRequest)
        try {
            await creditSave(creditRequest);
            setSuccess(false);
            setTimeout(successAlert, 3000)
        } catch (error) {
            console.log(error);
            setFailed(false);
            setTimeout(failedAlert, 3000)
        };
    };

    const guaranteeCustomer = (
        <div>
            <Input label={t('Guarantee Identity Number')} name="guaranteeIdentityNumber" id="guaranteeIdentityNumber" type="text" onChange={onChange} />
            <Input label={t('Guarantee Price')} name="customerGuaranteePrice" id="customerGuaranteePrice" type="text" onChange={onChange} />
        </div>
    )

    const guaranteeComponent = (
        <div className='text-center'>
            <hr />
            <div className="form-check">
                <input className="form-check-input float-none me-3" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked={true} onChange={() => setGuaranteeType('GUARANTEE_CUSTOMER')} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    {t('Guarantee Customer')}
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input float-none me-3" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => setGuaranteeType('GUARANTEE_ASSET')} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    {t('Guarantee Asset')}
                </label>
            </div>
            <hr />
        </div>
    )

    return (
        <div className='container mt-5'>
            <form className='form-group bg-light rounded'>
                <h1 className='text-center'>{t('Credit Request')}</h1>
                <Input label={t('Identity Number')} name="identityNumber" id="identityNumber" type="text" onChange={onChange} />
                <Input label={t('Birth Date')} name="birthDate" id="birthDate" type="date" onChange={onChange} />
                <hr />
                <div className="form-check form-switch text-center">
                    <input className="form-check-input float-none me-3" type="checkbox" role="switch" aria-checked="false"
                        id="flexSwitchCheckChecked" defaultChecked={true} onChange={() => setGuarantee(guarantee ? false : true) &&
                            setGuaranteeType(guarantee === false ? null : 'GUARANTEE_CUSTOMER')} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{t('Guarantee')}</label>
                </div>
                {guarantee ? guaranteeComponent : null}
                {(guarantee) && (guaranteeType === 'GUARANTEE_CUSTOMER' ? guaranteeCustomer : guaranteeType === 'GUARANTEE_ASSET' ?
                    <Dropdown /> : null)}
                <div className="text-center">
                    <button className="btn btn-primary m-3" onClick={onClickLogin}>{t('Credit Request')}</button>
                </div>
                <div className="alert alert-danger text-center" role="alert" hidden={failed}>{t('The Credit Process Failed')}</div>
                <div className="alert alert-success text-center" role="alert" hidden={success}>{t('The Credit Operations Are Successful')}</div>
            </form>
        </div>
    )
}

export default withTranslation()(CreditRequestPage);