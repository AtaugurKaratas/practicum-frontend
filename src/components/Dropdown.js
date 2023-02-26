import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { getCustomerAssets } from '../api/assetService'
import Input from '../components/Input';

const Dropdown = (props) => {
    const { t  } = props;
    const [values, setValues] = useState([]);
    const [guarantee, setGuarantee] = useState('');

    useEffect(() => {
        const customerId = JSON.parse(localStorage.customer).customerId
        getCustomerAssets(customerId).then((resp) => {
            setValues(Object.entries(resp.data))
        })
    }, [])
    const value = Object.entries(values)
    return (
        <div className='text-center'>
            <label htmlFor="guaranteeId" className="m-2 d-block">{t('Guarantee Asset Name')}</label>
            <select name="customerAssetId" id="customerAssetId" onChange={(e) => setGuarantee(e.target.value)}
                className="form-select d-inline" style={{ width: '90%' }} aria-label="Default select example">
                {
                    value.map((x) => <option id={x[1][1].id} key={x[1][1].id} value={x[1][1].price}>{x[1][1].name}</option>)
                }
            </select>
            <Input label={t('Guarantee Amount')} name="assetGuaranteePrice" id="assetGuaranteePrice"
                type="text" value={guarantee ? guarantee : ''} disabled={true}/>
        </div>
    )
}

export default withTranslation()(Dropdown);