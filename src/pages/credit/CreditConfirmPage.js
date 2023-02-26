import React, { useEffect, useState } from 'react'
import Input from '../../components/Input';
import { useLocation } from 'react-router-dom';
import { getCredit, calculationCredit } from '../../api/creditService';
import { withTranslation } from 'react-i18next';

const CreditConfirmPage = (props) => {
    const { t } = props;
    const [creditRating, setCreditRating] = useState(0);
    const [customerNameSurname, setCustomerNameSurname] = useState('');
    const [guaranteeType, setGuaranteeType] = useState('');
    const [guaranteeAmount, setGuaranteeAmount] = useState('');
    const [monthlySalary, setMonthlySalary] = useState('');
    const [checkCreditRating, setCheckCreditRating] = useState(true);
    const [creditLimitRating, setCreditLimitRating] = useState(0);
    const [checkCreditLimitRating, setCheckCreditLimitRating] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const getCreditInformation = async () => {
            try {
                await getCredit(location.state.idValue).then((resp) => {
                    const creditInfo = resp.data
                    setCustomerNameSurname(creditInfo.customerName + " " + creditInfo.customerSurname)
                    setMonthlySalary(creditInfo.monthlySalary)
                    setGuaranteeType(creditInfo.guaranteeType)
                    setGuaranteeAmount(creditInfo.guaranteeAmount)
                })
            } catch (error) {
                console.log(error)
            }
        }
        getCreditInformation();
    }, []);

    const onClick = async (event) => {
        event.preventDefault();
        const creditBody = {
            creditId: location.state.idValue
        };
        try {
            await calculationCredit(creditBody).then((resp) => {
                const checkCreditResponse = resp.data
                setCreditRating(checkCreditResponse.creditRating)
                setCreditLimitRating(checkCreditResponse.creditLimitValue)
                if (checkCreditResponse.creditRating >= 500) {
                    setCheckCreditRating(false);
                    setCheckCreditLimitRating(false);
                } else {
                    setCheckCreditRating(false);
                }
                console.log(resp);
            })
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='container mt-5'>
            <form className='form-group bg-light'>
                <h1 className='text-center'>{t('Credit Confirm Page')}</h1>
                <Input label={t('Customer Name - Surname')} value={customerNameSurname} name="customerNameSurname"
                    id="customerNameSurname" type="text" disabled={true} />
                    <Input label={t('Customer Monthly Salary')} value={monthlySalary + ' TL'} name="monthlySalary"
                    id="monthlySalary" type="text" disabled={true} />
                <Input label={t('Guarantee Type')} value={guaranteeType === null ? t('NONE') :
                    (guaranteeType === 'GUARANTEE_CUSTOMER' ? t('CUSTOMER') : t('ASSET'))}
                    name="guaranteeType" id="guaranteeType" type="text" disabled={true} />
                <Input label={t('Guarantee Amount')} value={guaranteeAmount + ' TL'} name="guaranteeAmount" id="guaranteeAmount" type="text" disabled={true} />
                <div className="text-center">
                    <button className="btn btn-primary m-3" onClick={onClick}>{t('Result')}</button>
                </div>
                <h5 className='text-center' style={checkCreditLimitRating ? { color: 'red' } : { color: 'blue' }}
                    hidden={checkCreditRating}>{t('Credit Rating')}: {creditRating}</h5>
                <h5 className='text-center' style={{ color: 'blue' }} hidden={checkCreditLimitRating}>{t('Credit Limit Value:')} {creditLimitRating}</h5>
            </form>
        </div>
    )
};

export default withTranslation()(CreditConfirmPage);