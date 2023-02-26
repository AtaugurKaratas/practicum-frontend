import React, { useEffect, useState } from 'react'
import { getCustomerAssets } from '../../api/assetService';
import { withTranslation } from 'react-i18next';

const CustomerAllAssets = (props) => {
  const t = props.t;
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const customerId = JSON.parse(localStorage.getItem('customer')).customerId
    const allCustomerAssets = async () => {
      try {
        await getCustomerAssets(customerId).then((resp) => {
          setAssets(resp.data);
        });
      } catch (error) {
        console.log(error)
      }
    }
    allCustomerAssets()
  }, []);

  return (
    <div className='container'>
      <h1 className='text-center m-3'>{t('All Customer Assets')}</h1>
      {assets.map(x =>
        <div key={x.id} className="card bg-light d-inline-block m-4" style={{ width: '24rem' }}>
          <input className="card-img-top" type="image" width={382} height={271} src={x.imagePath} alt="Card image cap" style={{
            border: "1px solid", borderRadius: "2%"
          }} />
          <div className="card-body">
            <p className="card-text text-center">{x.name}</p>
            <hr />
            <div className='text-center'>
              <button className='btn btn-dark' disabled>{t('Price')}: {x.price} TL</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default withTranslation()(CustomerAllAssets);