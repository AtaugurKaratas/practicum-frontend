import React, { useEffect, useState } from 'react'
import Input from '../../components/Input';
import ProfileImage from '../../components/ProfileImage';
import PhoneInput from 'react-phone-input-2';
import { getEmployee, getEmployeeforLocalStorage, updateEmployeeInfo } from '../../api/employeeService';
import { withTranslation } from 'react-i18next';


const EmployeeInformation = (props) => {
    const { t } = props;
    const [employeeName, setEmployeeName] = useState('');
    const [employeeSurname, setEmployeeSurname] = useState('');
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
        const getEmployeeInfoValue = async () => {
            try {
                await getEmployee(authId)
            }
            catch (error) {
                console.log(error);
            }
        }
        getEmployeeInfoValue()
        const getEmployeeParam = async () => {
            try {
                await getEmployee(authId).then((resp) => {
                    const employee = resp.data
                    setEmployeeName(employee.name)
                    setEmployeeSurname(employee.surname)
                    setPhoneNumber(employee.phoneNumber)
                    setBirthDate(employee.birthDate)
                    setNewImage(employee.imagePath)
                })
            } catch (error) {
                console.log("error")
            };
        };
        const eventStorage = () => {
            if (localStorage.employee === undefined) {
                ;
            } else {
                if (localStorage.employee !== '""')
                    getEmployeeParam();
            }
        }
        setTimeout(eventStorage, 100);
    }, []);

    const onClickUpdate = async event => {
        event.preventDefault();
        const employeeId = JSON.parse(localStorage.employee).employeeId
        const booleanValue = String(newImage).includes(',')
        if (newImage !== null && booleanValue) {
            imagePath = newImage.split(',')[1]
        }
        const employeeInfo = {
            employeeId,
            employeeName,
            employeeSurname,
            phoneNumber,
            birthDate,
            imagePath
        };
        console.log(employeeInfo);
        try {
            await updateEmployeeInfo(employeeInfo)
            getEmployeeforLocalStorage(JSON.parse(localStorage.user).id)
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
                <h1 className="text-center">{t('Employee Information')}</h1>
                <ProfileImage className={'rounded-circle shadow m-3'} onChange={onChangeImage} width={200}
                    height={200} image={newImage} id='imagePath' />
                <Input label={t('Name')} name="name" id="name" type="text" value={employeeName}
                    onChange={(event) => { setEmployeeName(event.target.value) }} error={errorList.employeeName} />
                <Input label={t('Surname')} name="surname" id="surname" type="text" value={employeeSurname}
                    onChange={(event) => { setEmployeeSurname(event.target.value) }} error={errorList.employeeSurname} />
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
                <Input label={t('Birth Date')} name="birthDate" id="birthDate" type="date" value={birthDate}
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

export default withTranslation()(EmployeeInformation);