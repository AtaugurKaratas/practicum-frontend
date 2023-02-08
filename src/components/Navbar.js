import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { changeLanguage } from "../api/apiCalls";

class Navbar extends React.Component {
    onChangeLanguage = language => {
        const { i18n } = this.props;
        i18n.changeLanguage(language);
        changeLanguage(language);
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <nav className="navbar navbar-light navbar-expand" style={{ backgroundColor: "#e3f2fd" }}>
                    <div className="container-fluid">
                        <div className="navbar-brand">
                            {t('DefineX Credit Application')}
                        </div>
                        <ul className="navbar-nav">
                            <li>
                                <Link className="nav-link" to="/login">{t('Customer Login')}</Link>
                            </li>
                            <li>
                                <Link className="nav-link" to="/register">{t('Customer Register')}</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {t('Languages')}
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li className="dropdown-item" onClick={() => this.onChangeLanguage('en')} style={{ cursor: 'pointer' }}>{t('English')}</li>
                                    <li className="dropdown-item" onClick={() => this.onChangeLanguage('tr')} style={{ cursor: 'pointer' }}>{t('Turkish')}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withTranslation()(Navbar);