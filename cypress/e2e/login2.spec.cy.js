
import userData from '../fixtures/userData.json'

describe('Orange HRM Tests', () => {

  const selectorsList = {
    usernameField: '[name="username"]',
    passwordField: '[name="password"]',
    loginButton: '[type="submit"]',
    dashboardGrid: '.orangehrm-dashboard-grid',
    myInfoButton: 'a[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: '[name="firstName"]',
    lastNameField: '[name="lastName"]'
  }

  // Localiza um campo pelo rótulo
  const getField = (label) => {
    return cy.contains('.oxd-input-group', label)
  }

  // Seleciona uma opção em um dropdown personalizado
  const selectDropdown = (label, option) => {
    getField(label)
      .find('.oxd-select-text')
      .click()

    cy.get('.oxd-select-dropdown')
      .contains('.oxd-select-option', option)
      .click()

    getField(label)
      .find('.oxd-select-text-input')
      .should('have.text', option)
  }

    // Selecionar gênero masculino
    cy.get('.--gender-grouped-field')
    .contains('label', 'Male')
    .click()

  beforeEach(() => {
    cy.visit('auth/login')

    cy.get(selectorsList.usernameField)
      .type(userData.userSucess.username)

    cy.get(selectorsList.passwordField)
      .type(userData.userSucess.password, { log: false })

    cy.get(selectorsList.loginButton).click()

    cy.location('pathname')
      .should('eq', '/web/index.php/dashboard/index')

    cy.get(selectorsList.dashboardGrid)
      .should('be.visible')
  })

  it('User info Update - Success', () => {

    // Acessar My Info
    cy.get(selectorsList.myInfoButton).click()

    cy.contains('h6', 'Personal Details')
      .should('be.visible')

    // Alterar nome
    cy.get(selectorsList.firstNameField)
      .clear()
      .type('First Name Test')

    cy.get(selectorsList.lastNameField)
      .clear()
      .type('Last Name Test')

    // Alterar dados pessoais
    getField('Employee Id')
      .find('input')
      .clear()
      .type('AbcdTest')

    getField("Driver's License Number")
      .find('input')
      .clear()
      .type('AB')

    // Alterar nacionalidade e estado civil
    selectDropdown('Nationality', 'Brazilian')
    selectDropdown('Marital Status', 'Married')

    // Alterar data de nascimento
    getField('Date of Birth')
      .find('input')
      .clear()
      .type('2002-01-26')
      .blur()


    //Alterar genero
    getField('.--gender-grouped-field')
    .contains('label', 'Male')
    .click()

    // Salvar dados pessoais
    cy.contains('.orangehrm-card-container', 'Personal Details')
      .find('form')
      .contains('button', 'Save')
      .click()

    cy.get('.oxd-toast')
      .should('contain.text', 'Successfully Saved')

    // Alterar tipo sanguíneo
    selectDropdown('Blood Type', 'B+')

    cy.contains('.orangehrm-card-container', 'Custom Fields')
      .find('form')
      .contains('button', 'Save')
      .click()

    cy.get('.oxd-toast')
      .should('contain.text', 'Successfully Saved')

    // Validar informações após salvar
    cy.get(selectorsList.firstNameField)
      .should('have.value', 'First Name Test')

    cy.get(selectorsList.lastNameField)
      .should('have.value', 'Last Name Test')
  })
})
