class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email);
  }

  fillPassword(password) {
    cy.get('[data-testid="senha"]').clear().type(password);
  }

  submit() {
    cy.get('[data-testid="entrar"]').click();
  }

  loginAs(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }

  assertErrorVisible() {
    cy.contains(/email e\/ou senha inválidos/i).should('be.visible');
  }

  assertStillOnLogin() {
    cy.url().should('include', '/login');
  }
}

export default new LoginPage();
