class LoginPage {
    selectorsList(){
        const selectors = {
            usernameField: "[name='username']",
            passwordField: "[name='password']",
            loginButton: "[type='submit']",
            wrongCredentialAlert: "[role='alert']",
        }

        return selectors
    }

    acessLoginPage(){
        cy.visit('auth/login')
    }

    loginWithUser(username, password){
        cy.get(this.selectorsList().usernameField).type(username)

        cy.get(this.selectorsList().passwordField).type(password)

        cy.get(this.selectorsList().loginButton).click()
    }

    checkAcessInvalid(){
        cy.get(this.selectorsList().wrongCredentialAlert)
    }
    
}

export default LoginPage