import userData from '../fixtures/userData.json'

describe('Orange HRM Tests', () => {

  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    sectionTitleTopBar: ".oxd-topbar-header-breadcrumb > .oxd-text",
    dashboardGrid: ".orangehrm-dashboard-grid",
    wrongCredentialAlert: "[role='alert']",
    myInfoButton: 'a[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    employeeIdField: ":nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input",
    driversLicenseField: ":nth-child(2) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input",
    licenseExpiryField: ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input",
    licenseExpiryDateButton: ".--today",
    submitButton: ".orangehrm-card-container > .oxd-form > .oxd-form-actions > .oxd-button"
  }

  it.only('User info Update - Sucess', () => {
    cy.visit('auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSucess.username)
    cy.get(selectorsList.passwordField).type(userData.userSucess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid)
    cy.get(selectorsList.myInfoButton).click()
    cy.contains('h6', 'Personal Details').should('be.visible')
    cy.get(selectorsList.firstNameField).type("First Name Test")
    cy.get(selectorsList.lastNameField).type("Last Name Test")
    cy.get(selectorsList.employeeIdField).clear().type("AbcdTest")
    cy.get(selectorsList.driversLicenseField).clear().type("AB")
    cy.get(selectorsList.licenseExpiryField).click()
    cy.get(selectorsList.licenseExpiryDateButton).click()
    cy.get(selectorsList.submitButton).click()
    cy.get('body').should('contain','Successfully Saved')
    cy.get('.oxd-text--toast-message')
  })

  it('Login - Sucess', () => {
    cy.visit('auth/login')
    cy.get(selectorsList.usernameField).type(userData.userSucess.username)
    cy.get(selectorsList.passwordField).type(userData.userSucess.password)
    cy.get(selectorsList.loginButton).click()
    cy.location('pathname').should('equal', '/web/index.php/dashboard/index')
    cy.get(selectorsList.dashboardGrid)
  })

  it('Login - Fail', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(selectorsList.usernameField).type(userData.userFail.username)
    cy.get(selectorsList.passwordField).type(userData.userFail.password)
    cy.get(selectorsList.loginButton).click()
    cy.get(selectorsList.wrongCredentialAlert)
  })
  
})