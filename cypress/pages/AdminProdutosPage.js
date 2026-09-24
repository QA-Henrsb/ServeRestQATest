class AdminProdutosPage {
  visitCreate() {
    cy.visit('/admin/cadastrarprodutos');
  }

  visitList() {
    cy.visit('/admin/listarprodutos');
  }

  fillNome(nome) {
    cy.get('[data-testid="nome"]').clear().type(nome);
  }

  fillPreco(preco) {
    cy.get('[data-testid="preco"]').clear().type(String(preco));
  }

  fillDescricao(descricao) {
    cy.get('[data-testid="descricao"]').clear().type(descricao);
  }

  fillQuantidade(quantidade) {
    cy.get('[data-testid="quantity"]').clear().type(String(quantidade));
  }

  submit() {
    cy.get('[data-testid="cadastarProdutos"]').click();
  }

  createProduct({ nome, preco, descricao, quantidade }) {
    this.fillNome(nome);
    this.fillPreco(preco);
    this.fillDescricao(descricao);
    this.fillQuantidade(quantidade);
    this.submit();
  }

  assertProductInList(nome) {
    cy.contains('td', nome).should('be.visible');
  }
}

export default new AdminProdutosPage();
