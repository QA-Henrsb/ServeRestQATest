/**
 * Cliente fino sobre cy.request para a API ServeRest.
 * Centraliza URL, headers e helpers de setup (usuario/produto).
 */
const apiUrl = () => Cypress.env('apiUrl');

function request(method, path, options = {}) {
  const { body, token, failOnStatusCode = false, headers = {} } = options;

  return cy.request({
    method,
    url: `${apiUrl()}${path}`,
    body,
    failOnStatusCode,
    headers: {
      ...(token ? { Authorization: token } : {}),
      ...headers,
    },
  });
}

export const api = {
  login(email, password) {
    return request('POST', '/login', { body: { email, password } });
  },

  createUser({ nome, email, password, administrador = 'false' }) {
    return request('POST', '/usuarios', {
      body: { nome, email, password, administrador },
    });
  },

  createProduct(token, product) {
    return request('POST', '/produtos', { body: product, token });
  },

  getProduct(token, id) {
    return request('GET', `/produtos/${id}`, { token });
  },

  deleteProduct(token, id) {
    return request('DELETE', `/produtos/${id}`, { token });
  },

  listProducts(token) {
    return request('GET', '/produtos', { token });
  },
};
