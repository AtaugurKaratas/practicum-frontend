import React, { useEffect, useState } from 'react'
import Input from '../../components/Input';
import ProfileImage from '../../components/ProfileImage';
import PhoneInput from 'react-phone-input-2';
import { getAdmin, getAdminforLocalStorage, updateAdminInfo } from '../../api/adminService';
import { withTranslation } from 'react-i18next';


const AdminInformationPage = (props) => {
    const { t } = props;
    const [adminName, setAdminName] = useState('');
    const [adminSurname, setAdminSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [newImage, setNewImage] = useState('');
    const [errorList, setErrorList] = useState([]);
    const [success, setSuccess] = useState(true);
    const [failed, setFailed] = useState(true);
    var imagePath

    const successAlert = () => {
        setSuccess(true);
    }

    const failedAlert = () => {
        setFailed(true);
    }

    useEffect(() => {
        const authId = JSON.parse(localStorage.user).id
        const getAdminInfoValue = async () => {
            try {
                await getAdmin(authId)
            }
            catch (error) {
                console.log(error);
            }
        }
        getAdminInfoValue()
        const getAdminParam = async () => {
            try {
                await getAdmin(authId).then((resp) => {
                    const adminResponse = resp.data
                    setAdminName(adminResponse.name)
                    setAdminSurname(adminResponse.surname)
                    setPhoneNumber(adminResponse.phoneNumber)
                    setBirthDate(adminResponse.birthDate)
                    setNewImage(adminResponse.imagePath)
                    console.log(adminResponse)
                })
            } catch (error) {
                console.log("error")
            };
        };
        const eventStorage = () => {
            getAdminParam();
        }
        setTimeout(eventStorage, 100);
    }, []);

    const onClickUpdate = async event => {
        event.preventDefault();
        const adminId = JSON.parse(localStorage.admin).adminId
        const booleanValue = String(newImage).includes(',')
        if (newImage !== null && booleanValue) {
            imagePath = newImage.split(',')[1]
        }
        const adminInfoUpdateRequest = {
            adminId,
            adminName,
            adminSurname,
            phoneNumber,
            birthDate,
            imagePath
        };
        try {
            await updateAdminInfo(adminInfoUpdateRequest)
            getAdminforLocalStorage(JSON.parse(localStorage.user).id)
            setSuccess(false);
            setTimeout(successAlert, 3000)
        } catch (error) {
            setErrorList(error.response.data.validationErrors);
            setFailed(false);
            setTimeout(failedAlert, 3000)
        };
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
        <div className="container mt-3">
            <form className="form-group bg-light rounded">
                <h1 className="text-center">{t('Admin Information')}</h1>
                <ProfileImage className={'rounded-circle shadow m-3'} onChange={onChangeImage} width={200}
                    height={200} image={newImage} id='imagePath'/>
                <Input label={t('Name')} name="name" id="name" type="text" value={adminName}
                    onChange={(event) => { setAdminName(event.target.value) }} error={errorList.adminName} />
                <Input label={t('Surname')} name="surname" id="surname" type="text" value={adminSurname}
                    onChange={(event) => { setAdminSurname(event.target.value) }} error={errorList.adminSurname} />
                <div className='form-group text-center'>
                    <label className='m-2'>{t('Phone Number')}</label>
                    <PhoneInput
                        inputProps={{
                            required: true,
                        }}
                        id="phoneNumber"
                        name="phoneNumber"
                        containerStyle={{ display: 'd-inline' }}
                        country={"tr"}
                        value={phoneNumber}
                        inputClass={'d-inline-block'}
                        inputStyle={{ width: '90%' }}
                        buttonStyle={{ left: '5%' }}
                        onChange={setPhoneNumber}
                    />
                </div>
                <Input label={t('Birth Date')} name="birthDate" id="birthDate" type="date"  value={birthDate}
                    onChange={(event) => { setBirthDate(event.target.value) }} error={errorList.birthDate} />
                <Input label={t('Image')} name="imagePath" id="imagePath" type="file" onChange={onChangeImage} />
                <div className="text-center">
                    <button id="submit" className="btn btn-primary m-3" onClick={onClickUpdate}>{t('Update')}</button>
                </div>
                <div className="alert alert-danger text-center" role="alert" hidden={failed}>{t('An Error Was Encountered During The Operation')}</div>
                <div className="alert alert-success text-center" role="alert" hidden={success}>{t('The Operations Are Successful')}</div>
            </form>
        </div>
    )
}

export default withTranslation()(AdminInformationPage);