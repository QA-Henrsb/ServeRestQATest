import LoginPage from '../pages/LoginPage';

describe('SRV-FE-03 - Login invalido na UI', () => {
  it('mantem o usuario na tela de login e exibe erro', () => {
    LoginPage.visit();
    LoginPage.loginAs('nao.existe@example.com', 'senha-errada');

    LoginPage.assertStillOnLogin();
    LoginPage.assertErrorVisible();
    cy.get('[data-testid="logout"]').should('not.exist');
  });
});
