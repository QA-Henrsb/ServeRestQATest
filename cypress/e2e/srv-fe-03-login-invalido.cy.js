import LoginPage from '../pages/LoginPage';

describe('SRV-FE-03 - Login invalido na UI @smoke', () => {
  it('mantem o usuario na tela de login e exibe erro @smoke', () => {
    LoginPage.visit();
    LoginPage.loginAs('nao.existe@example.com', 'senha-errada');

    LoginPage.assertStillOnLogin();
    LoginPage.assertErrorVisible();
    cy.get('[data-testid="logout"]').should('not.exist');
  });
});
