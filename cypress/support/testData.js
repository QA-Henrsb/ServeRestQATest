/**
 * Gera dados unicos por execucao.
 * Ambiente publico compartilhado: nao depender de usuarios fixos.
 */
function suffix() {
  return `${Date.now()}_${Cypress._.random(1000, 9999)}`;
}

export function buildUser(overrides = {}) {
  const id = suffix();
  return {
    nome: `QA User ${id}`,
    email: `qa.user.${id}@example.com`,
    password: 'Senha@123',
    administrador: 'false',
    ...overrides,
  };
}

export function buildAdmin(overrides = {}) {
  return buildUser({
    nome: `QA Admin ${suffix()}`,
    email: `qa.admin.${suffix()}@example.com`,
    administrador: 'true',
    ...overrides,
  });
}

export function buildProduct(overrides = {}) {
  const id = suffix();
  return {
    nome: `Produto QA ${id}`,
    preco: 150,
    descricao: `Descricao automatizada ${id}`,
    quantidade: 25,
    ...overrides,
  };
}
