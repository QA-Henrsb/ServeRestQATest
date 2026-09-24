class CadastroPage {
  visit() {
    cy.visit('/cadastrarusuarios');
  }

  fillNome(nome) {
    cy.get('[data-testid="nome"]').clear().type(nome);
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email);
  }

  fillPassword(password) {
    cy.get('[data-testid="password"]').clear().type(password);
  }

  markAsAdmin() {
    cy.get('[data-testid="checkbox"]').check({ force: true });
  }

  submit() {
    cy.get('[data-testid="cadastrar"]').click();
  }

  register({ nome, email, password, administrador = false }) {
    this.fillNome(nome);
    this.fillEmail(email);
    this.fillPassword(password);
    if (administrador) {
      this.markAsAdmin();
    }
    this.submit();
  }
}

export default new CadastroPage();
