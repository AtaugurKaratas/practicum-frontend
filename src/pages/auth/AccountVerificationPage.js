import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';
import { accountActivation } from '../../api/authService';

const AccountVerification = (props) => {
  const { t } = props;
  const { authId } = useParams();
  const { verifyCode } = useParams();
  const [result, setResult] = useState(true);

  useEffect(() => {
    const accountVerify = async () => {
      try {
        await accountActivation(authId, verifyCode);
        setResult(false);
      } catch (error) {
        console.log(error)
      }
    }
    accountVerify()
  }, []);

  return (
    <div className='container mt-5'>
      <div className="alert alert-success text-center" role="alert" hidden={result}>{t('Your Account Has Been Activated')}</div>
    </div>
  )
}

export default withTranslation()(AccountVerification);
