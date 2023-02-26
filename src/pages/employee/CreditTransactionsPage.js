import React, { useState, useEffect } from 'react'
import { getAllCredits } from '../../api/creditService';
import { useNavigate } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ProfileImage from '../../components/ProfileImage';

const CreditTransactions = (props) => {
    const { t } = props;
    const [creditList, setCreditList] = useState([]);
    const navigate = useNavigate();
    let value = 0;

    useEffect(() => {
        const allCredits = async () => {
            try {
                await getAllCredits().then((resp) => {
                    setCreditList(resp.data);
                });
            } catch (error) {
                console.log(error)
            }
        }
        allCredits()
    }, []);


    return (
        <div className='container'>
            <h1 className='text-center mt-5'>{t('Pending Credit Transactions')}</h1>
            <table className='table table-striped m-5 text-center' style={{ border: '1px solid' }}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">{t('Customer Profile')}</th>
                        <th scope="col">{t('Customer Name - Surname')}</th>
                        <th scope="col">{t('Customer Monthly Salary')}</th>
                        <th scope="col">{t('Guarantee Type')}</th>
                        <th scope="col">{t('Guarantee Amount')}</th>
                        <th scope="col">{t('Details')}</th>
                    </tr>
                </thead>
                <tbody>
                    {creditList.map(x =>
                        <tr key={x.id}>
                            {console.log(x)}
                            <th scope="row" className="align-middle">{++value}</th>
                            <td><ProfileImage className={'rounded-circle shadow m-3'}
                            width={48} height={48} image={x.imagePath} id='imagePath'/></td>
                            <td className="align-middle">{x.customerName} {x.customerSurname}</td>
                            <td className="align-middle">{x.monthlySalary} TL</td>
                            <td className="align-middle">{x.guaranteeType === null ? "-" : (x.guaranteeType==='GUARANTEE_CUSTOMER' ? t('CUSTOMER') : t('ASSET'))}</td>
                            <td className="align-middle">{x.guaranteeAmount} TL</td>
                            <td className="align-middle"><button className='btn btn-warning' onClick={() =>
                                navigate('/employee/confirm', {
                                    state: {
                                        idValue: x.id,
                                    }
                                })}
                            >{t('Detail')}</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default withTranslation()(CreditTransactions);