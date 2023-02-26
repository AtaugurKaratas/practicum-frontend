import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { saveCustomerAsset } from '../../api/assetService';
import AssetImage from '../../components/AssetImage';
import Input from '../../components/Input';

const AssetSave = (props) => {
    const { t } = props;
    const [newImage, setNewImage] = useState();
    const [assetName, setAssetName] = useState();
    const [price, setPrice] = useState();
    const [errorList, setErrorList] = useState({});
    const navigate = useNavigate();

    const onClickSaveAsset = async event => {
        const customerId = JSON.parse(localStorage.getItem('customer')).customerId
        event.preventDefault();
        const booleanValue = String(newImage).includes(',')
        if (newImage !== null && booleanValue) {
            var imagePath = newImage.split(',')[1]
        }
        const customerAssetRequest = {
            assetName,
            price,
            imagePath,
            customerId
        };
        try {
            await saveCustomerAsset(customerAssetRequest);
            navigate('/customer/assets');

        } catch (error) {
            setErrorList(error.response.data.validationErrors);
        }
    };

    const onChangeImage = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    return (
        <div className='container mt-5'>
            <form className="form-group bg-light rounded">
                <h1 className='text-center m-3'>{t('Customer Asset Save')}</h1>
                <AssetImage className={'rounded shadow m-3'} width={382} height={271} id='imagePath' image={newImage}/>
                <Input label={t('Asset Name')} name="assetName" id="assetName" type="text" error={errorList.assetName}
                onChange={(event) => setAssetName(event.target.value)} />
                <Input label={t('Price')} name="price" id="price" type="text" onChange={(event) => setPrice(event.target.value)} error={errorList.price}/>
                <Input label={t('Image')} name="image" id="image" type="file" onChange={onChangeImage} />
                <div className="text-center">
                    <button className="btn btn-primary m-3" onClick={onClickSaveAsset} >{t('Save')}</button>
                </div>
            </form>
        </div>
    )
}

export default withTranslation()(AssetSave);