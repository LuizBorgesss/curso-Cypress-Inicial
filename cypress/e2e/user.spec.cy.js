import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'
import MenuPage from '../pages/menuPage.js'
import MyInfoPage from '../pages/myInfosPage.js'

const loginPage =  new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()
const myInfosPage = new MyInfoPage()

describe('Orange HRM Tests', () => {

   it('User info Update - Sucess', () => {

    loginPage.acessLoginPage()

    loginPage.loginWithUser(userData.userSucess.username, userData.userSucess.password)

    dashboardPage.checkDashboardPage()

    menuPage.acessMyinfo()
    
    myInfosPage.checkMyInfoPage()

    myInfosPage.updateFirstName('Teste')

    myInfosPage.updateLastName('Testing')

    myInfosPage.updateEmployeeId('ID123456')

    myInfosPage.updateDriversLicense('AB1234')

    myInfosPage.updateLicenseDate('2028-01-26')

    myInfosPage.updateNationality()

    myInfosPage.updateMaritalStatus()

    myInfosPage.updateDateBirth('2002-01-26')

    myInfosPage.updateGender('Male')

    myInfosPage.submitButton()

    myInfosPage.updateBloodType()

    myInfosPage.submitButton2()

   })
})