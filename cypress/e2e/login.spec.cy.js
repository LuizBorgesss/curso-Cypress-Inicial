import userData from '../fixtures/userData.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'
import MenuPage from '../pages/menuPage.js'

const loginPage =  new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage()

describe('Orange HRM Tests', () => {

  const selectorsList = {
    
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    employeeIdField: ":nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input",
    driversLicenseField: ":nth-child(2) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input",
    licenseExpiryField: ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input",
    licenseExpiryDateButton: ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input",
    submitButton: ".orangehrm-card-container > .oxd-form > .oxd-form-actions > .oxd-button",
    selectCountryField: ":nth-child(5) > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input",
    selectMaritalStatus: ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input",
    selectDateBirth: ":nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input",
    radioButton: ":nth-child(1) > :nth-child(2) > .oxd-radio-wrapper > label",
    selectBloodType: ".orangehrm-card-container > .oxd-form > .oxd-form-row > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input",
    customFieldsSave: ".orangehrm-card-container > .oxd-form > .oxd-form-actions > .oxd-button"
  }

   it.only('User info Update - Sucess', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithUser(userData.userSucess.username, userData.userSucess.password)
    dashboardPage.checkDashboardPage()
    menuPage.acessMyinfo()
    
    cy.contains('h6', 'Personal Details').should('be.visible')

    cy.get(selectorsList.firstNameField).clear().type("First Name Test").should('have.value', 'First Name Test')

    cy.get(selectorsList.lastNameField).clear().type("Last Name Test").should('have.value', 'Last Name Test')

    cy.get(selectorsList.employeeIdField).clear().type("AbcdTest")

    cy.get(selectorsList.driversLicenseField).clear().type("AB")

    cy.get(selectorsList.licenseExpiryField).click()

    cy.get(selectorsList.licenseExpiryDateButton).click().clear().type("2027-01-26")

    cy.get(selectorsList.selectCountryField).click()

    cy.get('.oxd-select-dropdown').contains('Brazilian').click()

    cy.get(selectorsList.selectMaritalStatus).click()

    cy.get('.oxd-select-dropdown').contains('Married').click()

    cy.get(selectorsList.selectDateBirth).click().clear().type('2002-01-26')

    cy.get(selectorsList.radioButton).click()

    cy.get(selectorsList.submitButton).click()

    cy.get('body').should('contain','Successfully Saved')

    cy.get(selectorsList.selectBloodType).click()

    cy.get('.oxd-select-dropdown').contains('B+').click()

    cy.get(selectorsList.customFieldsSave).click()
   })

  it('Login - Sucess', () => {
    loginPage.acessLoginPage()
    loginPage.loginWithUser(userData.userSucess.username, )
    // cy.get(selectorsList.usernameField).type(userData.userSucess.username)
    
    // cy.get(selectorsList.passwordField).type(userData.userSucess.password)

    // cy.get(selectorsList.loginButton).click()

    // cy.location('pathname').should('equal', '/web/index.php/dashboard/index')

    // cy.get(selectorsList.dashboardGrid)


  })

  it('Login - Fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })
  
})