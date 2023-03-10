# CREDIT APPLICATION PROJECT

## [Backend](https://github.com/AtaugurKaratas/DefineX-java-spring-practicum) project I made using Spring Boot.

## Used Technologies and Libraries
* React
* Redux (Global State Management)
* React Router (Dynamic Routing)
* Axios (Communicate with the Backend)
* React-i18next (Multi-language Support)
* React Hooks
* Bootstrap

<hr/>

## Create Docker Image

Docker is a continerization tool.Using docker we can deploy our applications as

containers using docker images. Containers contains application code and also the softwares,

config files whatever is required for our application to run.

Create docker image using Dockerfile


```docker
docker build -t credit/frontend:latest .
```

<hr/>

## Project Structures
```
📁 project/
   📂 src/
        📂 api/
            📄 adminService.js
            📄 assetService.js
            📄 authService.js
            📄 creditService.js
            📄 customerService.js
            📄 employeeService.js
            📄 guaranteeService.js
            📄 headers.js
        📂 components/
        📂 configurations/
        📂 pages/
            📂 admin/
                📄 AdminInformationPage.js
                📄 SaveUserPage.js
                📄 UpdateCreditValuesPage.js  
            📂 auth/
                📄 AccountVerificationPage.js
                📄 ForgottenPasswordPage.js
                📄 LoginPage.js
                📄 RegisterPage.js
            📂 credit/
                📄 CreditConfirmPage.js
                📄 CreditGuaranteePage.js
                📄 CreditRequestPage.js
                📄 CreditResultPage.js
            📂 customer/
                📄 AssetSavePage.js
                📄 CustomerAllAssetsPage.js
                📄 CustomerGuaranteePage.js
                📄 CustomerInformationPage.js
            📂 employee/
                📄 CreditTransactionsPage.js
                📄 CustomerCreditRatingUpdatePage.js
                📄 EmployeeInformationPage.js
                📄 SearchCustomerCreditRatingPage.js
        📂 redux/
```