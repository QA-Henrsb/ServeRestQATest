import CadastroPage from '../pages/CadastroPage';
import LoginPage from '../pages/LoginPage';
import { buildUser } from '../support/testData';

describe('SRV-FE-01 - Cadastro e login com sucesso', () => {
  it('cadastra usuario novo e autentica na tela de login', () => {
    const user = buildUser();

    CadastroPage.visit();
    CadastroPage.register(user);

    cy.contains(/cadastro realizado com sucesso/i, { timeout: 15000 }).should(
      'be.visible',
    );

    // Cadastro autenticado automaticamente: forca fluxo de login via UI.
    cy.clearLocalStorage();
    LoginPage.visit();
    LoginPage.loginAs(user.email, user.password);

    cy.url({ timeout: 15000 }).should('include', '/home');
    cy.get('[data-testid="logout"]').should('be.visible');
  });
});
