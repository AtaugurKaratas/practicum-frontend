import React, { useEffect, useState } from 'react'
import { getGuaranteeList } from '../../api/guaranteeService';
import { useNavigate } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ProfileImage from '../../components/ProfileImage';

const CustomerGuarantee = (props) => {
    const { t } = props;
    const [guaranteeList, setGuaranteeList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const customerId = JSON.parse(localStorage.getItem('customer')).customerId
        const guaranteeListFunction = async () => {
            try {
                await getGuaranteeList(customerId).then((resp) => {
                    setGuaranteeList(resp.data);
                    console.log(guaranteeList);
                });
            } catch (error) {
                console.log(error)
            }
        }
        guaranteeListFunction()
    }, []);

    return (
        <div className='container'>
            <h1 className='text-center mt-5'>{t('Customer Guarantee Page')}</h1>
            <table className='table table-striped m-5 text-center' style={{ border: '1px solid' }}>
                <thead>
                    <tr>
                        <th>{t('Customer Profile')}</th>
                        <th>{t('Customer Name & Surname')}</th>
                        <th>{t('Guarantee Amount')}</th>
                        <th>{t('Guarantee Check')}</th>
                        <th>{t('Details')}</th>
                    </tr>
                </thead>
                <tbody>
                    {guaranteeList.map(x =>
                        <tr key={x.id}>
                            <td><ProfileImage className={'rounded-circle shadow m-3'}
                                width={48} height={48} image={x.imagePath} id='imagePath' /></td>
                            <td className='align-middle'>{x.customerName + " " + x.customerSurname}</td>
                            <td className='align-middle'>{x.guaranteeAmount} TL</td>
                            <td className='align-middle'>{x.guaranteeCheck ? "TRUE" : "FALSE"}</td>
                            <td className='align-middle'><button className='btn btn-warning' onClick={() =>
                                navigate('/customer/credit/guarantee', {
                                    state: {
                                        id: x.id,
                                    }
                                })
                            }>{t('Detail')}</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default withTranslation()(CustomerGuarantee);