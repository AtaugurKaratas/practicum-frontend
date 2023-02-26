import React from "react";
import { withTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeLanguage } from "../api/headers";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_EMPLOYEE } from '../redux/actions/actionTypes';
import { user_role } from "../redux/actions/rolesSlice";

const Navbar = (props) => {
    const roles = useSelector(state => state.roles.role);
    const dispatch = useDispatch();

    const onChangeLanguage = language => {
        const { i18n } = props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }
    const { t } = props;
    const languageList = (
        <li className="nav-item dropdown">
            <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {t('Languages')}
            </div>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li className="dropdown-item" onClick={() => onChangeLanguage('en')} style={{ cursor: 'pointer' }}>{t('English')}</li>
                <li className="dropdown-item" onClick={() => onChangeLanguage('tr')} style={{ cursor: 'pointer' }}>{t('Turkish')}</li>
            </ul>
        </li>
    );
    const customer = (
        <>
            <li>
                <Link className="nav-link" to="/customer/information">{t('Customer Information')}</Link>
            </li>
            <li>
                <Link className="nav-link" to="/customer/asset/save">{t('Customer Asset Save')}</Link>
            </li>
            <li>
                <Link className="nav-link" to="/customer/assets">{t('All Customer Assets')}</Link>
            </li>
            <li>
                <Link className="nav-link" to="/customer/credit/request">{t('Customer Credit Request')}</Link>
            </li>
            <li>
                <Link className="nav-link" to="/customer/guaranteeList">{t('Customer Guarantee List')}</Link>
            </li>
        </>
    );

    const user = (
        <>
            <li>
                <Link className="nav-link" to="/login">{t('User Login')}</Link>
            </li>
            <li>
                <Link className="nav-link" to="/register">{t('Customer Register')}</Link>
            </li>
            <li>
                <Link className="nav-link" to="/credit/result">{t('Credit Results')}</Link>
            </li>
        </>
    );

    const admin = (
        <>
            <li>
                <Link className="nav-link" to="/admin/information">{t('Admin Information')}</Link>
            </li>
            <li>
                <Link className="nav-link" to="/admin/user/save">{t('User Save')}</Link>
            </li>
            <li>
                <Link className="nav-link" to="/admin/credit">{t('Credit Update')}</Link>
            </li>
        </>
    );

    const employee = (
        <>
            <li>
                <Link className="nav-link" to="/employee/information">{t('Employee Information')}</Link>
            </li>
            <li>
                <Link className="nav-link" to="/employee/customer">{t('Customer Credit Rating Update')}</Link>
            </li>
            <li>
                <Link className="nav-link" to="/employee/credit">{t('Pending Credit Transactions')}</Link>
            </li>
        </>
    );

    const logOutProcess = () => {
        localStorage.clear();
        dispatch(user_role(null));
    };

    const logOut = (
        <>
            <li className="me-3">
                <Link className="nav-link" to="/login" onClick={logOutProcess}>{t('Log out')}</Link>
            </li>
        </>
    );

    const navbarProcess = () => {
        if (localStorage.getItem('user'))
            var roles = JSON.parse(localStorage.getItem('user')).role;
        switch (roles) {
            case ROLE_ADMIN:
                dispatch(user_role(ROLE_ADMIN))
                return admin;
            case ROLE_EMPLOYEE:
                dispatch(user_role(ROLE_EMPLOYEE))
                return employee;
            case ROLE_CUSTOMER:
                dispatch(user_role(ROLE_CUSTOMER))
                return customer;
            default:
                dispatch(user_role(null))
                return user;
        }
    }

    return (
        <div>
            <nav className="navbar navbar-light navbar-expand" style={{ backgroundColor: "#e3f2fd" }}>
                <div className="container-fluid">
                    <div className="navbar-brand">
                        {t('DefineX Credit Application')}
                    </div>
                    <ul className="navbar-nav">
                        {navbarProcess()}
                        {languageList}
                        {roles && logOut}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default withTranslation()(Navbar);