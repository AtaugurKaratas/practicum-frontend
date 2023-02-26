import React, { useEffect, useState } from 'react'
import Input from '../../components/Input';
import ProfileImage from '../../components/ProfileImage';
import { withTranslation } from 'react-i18next';
import { customerSave, customerUpdate, getCustomer, getCustomerforLocalStorage } from '../../api/customerService';
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css"
import { useNavigate } from 'react-router-dom';
import { user_role } from "../../redux/actions/rolesSlice";
import { useDispatch } from "react-redux";
import { deleteUser } from '../../api/authService';

const CustomerInformation = (props) => {
    const { t } = props;
    const [customerName, setCustomerName] = useState();
    const [customerSurname, setCustomerSurname] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [monthlySalary, setMonthlySalary] = useState();
    const [birthDate, setBirthDate] = useState();
    const [newImage, setNewImage] = useState();
    const [updateCheck, setUpdateCheck] = useState(false);
    const [customerId, setCustomerId] = useState(false);
    const [errorList, setErrorList] = useState([]);
    const [success, setSuccess] = useState(true);
    const [failed, setFailed] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    var imagePath

    const successAlert = () => {
        setSuccess(true);
    }

    const failedAlert = () => {
        setFailed(true);
    }

    useEffect(() => {
        const authId = JSON.parse(localStorage.user).id
        const getCustomerInfoValue = async () => {
            try {
                await getCustomer(authId)
            }
            catch (error) {
                console.log(error);
            }
        }
        getCustomerInfoValue()
        const getCustomerParam = async () => {
            try {
                await getCustomer(authId).then((resp) => {
                    const customerObject = resp.data
                    document.getElementById('name').value = customerObject.name
                    document.getElementById('surname').value = customerObject.surname
                    document.getElementById('monthlySalary').value = customerObject.monthlySalary
                    document.getElementById('birthDate').value = customerObject.birthDate
                    document.getElementById('imagePath').src = "/images/" + customerObject.imagePath
                    if (customerObject.customerId !== null) {
                        document.getElementById('submit').textContent = t('Update')
                        setUpdateCheck(true);
                        setCustomerName(customerObject.name)
                        setCustomerSurname(customerObject.surname)
                        setPhoneNumber(customerObject.phoneNumber)
                        setMonthlySalary(customerObject.monthlySalary)
                        setBirthDate(customerObject.birthDate)
                        setNewImage(customerObject.imagePath)
                        setCustomerId(customerObject.customerId)
                    }
                })
            } catch (error) {
                console.log("error")
            };
        };
        const eventStorage = () => {
            if (localStorage.customer === undefined) {
                ;
            } else {
                if (localStorage.customer !== '""')
                    getCustomerParam();
            }
        }
        setTimeout(eventStorage, 100);
    }, []);

    const onClickSave = async event => {
        event.preventDefault();
        const authId = JSON.parse(localStorage.user).id
        console.log(authId)
        const booleanValue = String(newImage).includes(',')
        if (newImage !== null && booleanValue) {
            imagePath = newImage.split(',')[1]
        }
        const customerInfo = {
            customerId,
            customerName,
            customerSurname,
            phoneNumber,
            monthlySalary,
            birthDate,
            imagePath,
            authId
        };
        console.log(customerInfo)
        try {
            await customerSave(customerInfo)
            getCustomerforLocalStorage()
            setSuccess(false);
            setTimeout(successAlert, 3000)
        } catch (error) {
            setErrorList(error.response.data.validationErrors);
            setFailed(false);
            setTimeout(failedAlert, 3000)
        };
    };

    const onClickDelete = async (event) => {
        event.preventDefault();
        try {
            await deleteUser(JSON.parse(localStorage.user).id)
            dispatch(user_role(null));
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            console.log(error)
        };
    }

    const onClickUpdate = async event => {
        event.preventDefault();
        const customerId = JSON.parse(localStorage.customer).customerId
        const booleanValue = String(newImage).includes(',')
        if (newImage !== null && booleanValue) {
            imagePath = newImage.split(',')[1]
        }
        const customerInfo = {
            customerId,
            customerName,
            customerSurname,
            phoneNumber,
            monthlySalary,
            birthDate,
            imagePath
        };
        try {
            await customerUpdate(customerInfo)
            getCustomerforLocalStorage()
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
                <h1 className="text-center">{t('Customer Information')}</h1>
                <ProfileImage className={'rounded-circle shadow m-3'} onChange={onChangeImage} width={200}
                    height={200} image={newImage} id='imagePath' />
                <Input label={t('Name')} name="name" id="name" type="text"
                    onChange={(event) => { setCustomerName(event.target.value) }} error={errorList.customerName} />
                <Input label={t('Surname')} name="surname" id="surname" type="text"
                    onChange={(event) => { setCustomerSurname(event.target.value) }} error={errorList.customerSurname} />
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
                <Input label={t('Monthly Salary')} name="monthlySalary" id="monthlySalary"
                    type="text" onChange={(event) => { setMonthlySalary(event.target.value) }} error={errorList.monthlySalary} />
                <Input label={t('Birth Date')} name="birthDate" id="birthDate" type="date"
                    onChange={(event) => { setBirthDate(event.target.value) }} error={errorList.birthDate} />
                <Input label={t('Image')} name="imagePath" id="imagePath" type="file" onChange={onChangeImage} />
                <div className="text-center">
                    <button id="submit" className="btn btn-primary m-3" onClick={updateCheck ? onClickUpdate : onClickSave}>{t('Save')}</button>
                    <button id="submit" className="btn btn-danger m-3" onClick={onClickDelete}>{t('Delete')}</button>
                </div>
                <div className="alert alert-danger text-center" role="alert" hidden={failed}>{t('An Error Was Encountered During The Operation')}</div>
                <div className="alert alert-success text-center" role="alert" hidden={success}>{t('The Operations Are Successful')}</div>
            </form>
        </div>
    )
}

export default withTranslation()(CustomerInformation);