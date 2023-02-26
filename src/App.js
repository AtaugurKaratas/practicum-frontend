import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import ForgottenPasswordPage from './pages/auth/ForgottenPasswordPage';
import CustomerInformationPage from './pages/customer/CustomerInformationPage';
import AssetSavePage from './pages/customer/AssetSavePage';
import CustomerAllAssetsPage from './pages/customer/CustomerAllAssetsPage';
import CustomerGuaranteePage from './pages/customer/CustomerGuaranteePage';
import CreditRequestPage from './pages/credit/CreditRequestPage';
import CreditConfirmPage from './pages/credit/CreditConfirmPage';
import CreditGuaranteePage from './pages/credit/CreditGuaranteePage';
import AdminInformationPage from './pages/admin/AdminInformationPage';
import SaveUserPage from './pages/admin/SaveUserPage';
import UpdateCreditValuesPage from './pages/admin/UpdateCreditValuesPage';
import EmployeeInformationPage from './pages/employee/EmployeeInformationPage';
import CreditTransactionsPage from './pages/employee/CreditTransactionsPage';
import CustomerCreditRatingUpdatePage from './pages/employee/CustomerCreditRatingUpdatePage';
import SearchCustomerCreditRatingPage from './pages/employee/SearchCustomerCreditRatingPage';
import CreditResultPage from './pages/credit/CreditResultPage';
import AccountVerificationPage from './pages/auth/AccountVerificationPage';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<RegisterPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/forgottenPassword' element={<ForgottenPasswordPage />} />
            <Route path='/logout' element={<></>} />
            <Route path='/auth/:authId/:verifyCode' element={<AccountVerificationPage/>} />
            <Route path='/customer/information' element={<CustomerInformationPage />} />
            <Route path='/customer/asset/save' element={<AssetSavePage />} />
            <Route path='/customer/credit/guarantee' element={<CreditGuaranteePage />} />
            <Route path='/customer/assets' element={<CustomerAllAssetsPage />} />
            <Route path='/customer/credit/request' element={<CreditRequestPage />} />
            <Route path='/customer/guaranteeList' element={<CustomerGuaranteePage />} />
            <Route path='/admin/information' element={<AdminInformationPage />} />
            <Route path='/admin/user/save' element={<SaveUserPage />} />
            <Route path='/admin/credit' element={<UpdateCreditValuesPage />} />
            <Route path='/employee/information' element={<EmployeeInformationPage />} />
            <Route path='/employee/confirm' element={<CreditConfirmPage />} />
            <Route path='/employee/credit' element={<CreditTransactionsPage />} />
            <Route path='/employee/customer' element={<SearchCustomerCreditRatingPage />} />
            <Route path='/employee/credit-update/:identityNumber' element={<CustomerCreditRatingUpdatePage/>} />
            <Route path='/credit/result' element={<CreditResultPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    )
  }
}

export default App;
