import LoginPage from '../pages/LoginPage';
import AdminProdutosPage from '../pages/AdminProdutosPage';
import { api } from '../support/apiClient';
import { buildAdmin, buildProduct } from '../support/testData';

describe('SRV-FE-02 - Admin cria e lista produto', () => {
  // Setup via API: isola a UI no fluxo de produto (documentado no README).
  const admin = buildAdmin();
  const product = buildProduct();

  before(() => {
    api.createUser(admin).then((res) => {
      expect(res.status).to.eq(201);
    });
  });

  it('cria produto pela UI e confirma na listagem', () => {
    LoginPage.visit();
    LoginPage.loginAs(admin.email, admin.password);

    cy.url({ timeout: 15000 }).should('include', '/admin/home');
    cy.get('[data-testid="logout"]').should('be.visible');

    AdminProdutosPage.visitCreate();
    AdminProdutosPage.createProduct(product);

    AdminProdutosPage.visitList();
    AdminProdutosPage.assertProductInList(product.nome);
  });
});
