import React, { useState } from 'react'
import { withTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';

const SearchCustomerCreditRating = (props) => {
    const { t } = props;
    const navigate = useNavigate();
    const [identityNumber, setIdentityNumber] = useState();

    const onClickSearch = () => {
        navigate('/employee/credit-update/' + identityNumber);
    }

    return (
        <div className='container mt-5'>
            <form className='form-group bg-light rounded'>
                <h1 className='text-center'>{t('Customer Credit Rating Update')}</h1>
                <Input label={t('Customer Identity Number')} name="customerIdentityNumber" id="customerIdentityNumber" type="text"
                    onChange={(event) => setIdentityNumber(event.target.value)} />
                <div className="text-center">
                    <button id="submit" className="btn btn-primary m-3" onClick={onClickSearch}>{t('Search')}</button>
                </div>
            </form>
        </div>
    )
}

export default withTranslation()(SearchCustomerCreditRating);