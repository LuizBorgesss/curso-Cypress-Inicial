class MyInfoPage{

    selectorsList(){
        const selectors = {
                firstNameField: "[name='firstName']",
                lastNameField: "[name='lastName']", 
                genderGroup: '.--gender-grouped-field',
                calendarToday: '.--today',
                dropdown: '.oxd-select-dropdown'           
        }
        return selectors
    }

    //Método para checkar a página my info
    checkMyInfoPage(){
        cy.contains('h6', 'Personal Details').should('be.visible')
    }

    //Método para localizar campos pelo Label
    getField(label){
        return cy.contains('.oxd-input-group', label)
    }

    //Método para selecionar dropdowns
    selectDropdown(label, option) {
        this.getField(label).find('.oxd-select-text').click()

    cy.get('.oxd-select-dropdown').contains('.oxd-select-option', option).click()
    }

    //Alterar dados pessoais
    updateFirstName(firstName){
        cy.get(this.selectorsList().firstNameField).clear().type(firstName)
    }

    updateLastName(lastName){
        cy.get(this.selectorsList().lastNameField).clear().type(lastName)
    }

    updateEmployeeId(employeeId){
        this.getField('Employee Id').find('input').clear().type(employeeId)
    }

    updateDriversLicense(driversLicense){
        this.getField("Driver's License Number").find('input').clear().type(driversLicense)
    }

    //Alterar data de aniversário
    updateDateBirth(dateBirth){
        this.getField('Date of Birth').find('input').clear().type(dateBirth).blur()
    }

    updateLicenseDate(licenseDate){
        this.getField('License Expiry Date').find('input').clear().type(licenseDate).blur()
    }

    //Alterar genero
    updateGender(gender){
        cy.get(this.selectorsList().genderGroup).contains('label', gender).click()
    }

    //Alterar nacionalidade
    updateNationality(){
        this.selectDropdown('Nationality', 'Brazilian')
    }

    //Alterar status
    updateMaritalStatus(){
        this.selectDropdown('Marital Status', 'Married')
    }

    //Custom fields
    updateBloodType(){
        this.selectDropdown('Blood Type', 'B+')
    }

    //Salvar dados
    submitButton(){
        cy.contains('.orangehrm-card-container', 'Personal Details').find('form').contains('button', 'Save').click()

        cy.get('body').should('contain','Successfully Updated')
    }

    submitButton2(){
        cy.contains('.orangehrm-card-container', 'Custom Fields').find('form').contains('button', 'Save').click()
        cy.get('body').should('contain','Successfully Updated')
    }
} 

    export default MyInfoPage