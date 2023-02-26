import React, { useState } from 'react'
import { withTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import { saveEmployee, saveAdmin } from '../../api/adminService';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import Label from '../../components/Label';

const SaveUserPage = (props) => {
    const [identityNumber, setIdentityNumber] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    let roles = null
    const [success, setSuccess] = useState(true);
    const [failed, setFailed] = useState(true);

    const successAlert = () => {
        setSuccess(true);
    }

    const failedAlert = () => {
        setFailed(true);
    }

    const userTypeControl = () => {
        const adminCheck = document.getElementById('Admin').checked
        const employeeCheck = document.getElementById('Employee').checked
        if (adminCheck && employeeCheck) {
            roles = 'ROLE_ADMIN, ROLE_EMPLOYEE'
        } else {
            if (adminCheck) {
                roles = 'ROLE_ADMIN'
            } else {
                roles = 'ROLE_EMPLOYEE'
            }
        }
    }

    const onClickSave = async event => {
        event.preventDefault();
        userTypeControl();
        const authUserRegister = {
            identityNumber,
            name,
            surname,
            email,
            birthDate,
            phoneNumber
        };
        console.log(authUserRegister)
        console.log(roles)
        if (roles === 'ROLE_ADMIN') {
            try {
                await saveAdmin(authUserRegister);
                setSuccess(false);
                setTimeout(successAlert, 3000)
            } catch (error) {
                setFailed(false);
                setTimeout(failedAlert, 3000)
            };
        } else if (roles === 'ROLE_EMPLOYEE') {
            try {
                await saveEmployee(authUserRegister);
                setSuccess(false);
                setTimeout(successAlert, 3000)
            } catch (error) {
                setFailed(false);
                setTimeout(failedAlert, 3000)
            };
        }
    };

    const { t } = props;
    return (
        <div className='container mt-5'>
            <form className='form-group bg-light rounded'>
                <h1 className='text-center'>{t('User Save')}</h1>
                <Input label={t('Identity Number')} name="identityNumber" id="identityNumber" type="text" onChange={(event) => { setIdentityNumber(event.target.value) }} />
                <Input label={t('Name')} name="name" id="name" type="text" onChange={(event) => { setName(event.target.value) }} />
                <Input label={t('Surname')} name="surname" id="surname" type="text" onChange={(event) => { setSurname(event.target.value) }} />
                <Input label={t('Email')} name="email" id="email" type="text" onChange={(event) => { setEmail(event.target.value) }} />
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
                <Input label={t('Birth Date')} name="birthDate" id="birthDate" type="date" onChange={(event) => { setBirthDate(event.target.value) }} />
                <div className="form-group text-center m-2">
                    <Label name={t('User Role')} />
                    <CheckBox id="Admin" name={t("Admin")} value="option1" />
                    <CheckBox id="Employee" name={t("Employee")} value="option2" />
                </div>
                <Button onClick={onClickSave} name={t('Save')} />
                <div className="alert alert-danger text-center" role="alert" hidden={failed}>{t('An Error Was Encountered During The Operation')}</div>
                <div className="alert alert-success text-center" role="alert" hidden={success}>{t('The Operations Are Successful')}</div>
            </form>
        </div>
    )
}

export default withTranslation()(SaveUserPage)