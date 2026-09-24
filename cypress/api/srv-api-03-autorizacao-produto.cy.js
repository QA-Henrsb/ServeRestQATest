import { api } from '../support/apiClient';
import { buildUser, buildProduct } from '../support/testData';

describe('SRV-API-03 - Usuario comum nao cria produto @smoke', () => {
  it('retorna 403 ao tentar POST /produtos sem perfil admin @smoke', () => {
    const user = buildUser();
    const product = buildProduct();

    api.createUser(user).then((createRes) => {
      expect(createRes.status).to.eq(201);

      return api.login(user.email, user.password);
    }).then((loginRes) => {
      expect(loginRes.status).to.eq(200);
      expect(loginRes.body.authorization).to.be.a('string');

      return api.createProduct(loginRes.body.authorization, product);
    }).then((res) => {
      expect(res.status).to.eq(403);
      expect(res.body).to.have.property(
        'message',
        'Rota exclusiva para administradores',
      );
    });
  });
});
